import { useState, useEffect } from 'react'

export const TypewriterLine = ({
  text,
  onComplete,
  delay = 0,
}: {
  text: string
  onComplete?: () => void
  delay?: number
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isCursorVisible, setIsCursorVisible] = useState(true)

  const isCompleted = displayedText.length === text.length

  useEffect(() => {
    // Start typing after delay
    const startTimeout = setTimeout(() => {
      let currentIndex = 0
      // Typing speed: faster for longer text to keep it engaging
      const speed = text.length > 50 ? 10 : 20

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          if (onComplete) onComplete()
        }
      }, speed)

      return () => clearInterval(typeInterval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [text, delay, onComplete])

  // Cursor blink effect
  useEffect(() => {
    if (isCompleted) {
      setIsCursorVisible(false)
      return
    }
    const cursorInterval = setInterval(() => {
      setIsCursorVisible((v) => !v)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [isCompleted])

  return (
    <span>
      {displayedText}
      {isCursorVisible && !isCompleted && (
        <span className='inline-block w-[2px] h-[1em] bg-blue-500 ml-1 align-middle animate-pulse' />
      )}
    </span>
  )
}
