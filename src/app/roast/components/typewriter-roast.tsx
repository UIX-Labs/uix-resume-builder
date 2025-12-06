'use client'

import { cn } from '@shared/lib/utils'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Helper component for individual line typing
const TypewriterLine = ({
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

export function TypewriterRoast({ content }: { content: string }) {
  const [activeLineIndex, setActiveLineIndex] = useState(0)

  // Parse content into lines, handling the markdown bullet points
  // Split by newline, but sometimes markdown has soft wraps.
  // Assuming the roast comes as * Item \n * Item
  const lines = content.split('\n').filter((line) => line.trim().length > 0)

  return (
    <div className='space-y-4 font-mono text-base md:text-lg leading-relaxed text-slate-700 w-full max-w-3xl mx-auto'>
      {lines.map((line, index) => {
        const isBullet = line.trim().startsWith('*')
        // Remove the bullet and leading spaces
        const cleanLine = isBullet ? line.replace(/^\*\s*/, '') : line

        // Only render if it's the current line or previous line
        if (index > activeLineIndex) return null

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn('flex items-start gap-3', isBullet ? 'pl-2' : '')}
          >
            {isBullet && (
              <span className='text-xl mt-1 shrink-0'>
                {/* Randomize emoji potentially, or stick to fire/skull as in the prompt */}
                {['💀', '🔥', '🚩', '😩', '💅'][index % 5]}
              </span>
            )}
            <div className='flex-1'>
              {index === activeLineIndex ? (
                <TypewriterLine
                  text={cleanLine}
                  onComplete={() => setActiveLineIndex((prev) => prev + 1)}
                />
              ) : (
                // Render fully typed lines as static text to save resources
                // and parse simple markdown bolding if present
                <span
                  dangerouslySetInnerHTML={{
                    __html: cleanLine
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(
                        /`([^`]+)`/g,
                        '<code class="bg-slate-100 px-1 rounded text-pink-500">$1</code>'
                      ),
                  }}
                />
              )}
            </div>
          </motion.div>
        )
      })}

      {activeLineIndex === lines.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-8 text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100'
        >
          <p className='text-blue-700 font-bold text-xl mb-2'>
            Roast Served! 🍽️
          </p>
          <p className='text-slate-600 text-sm'>Now go fix that resume!</p>
        </motion.div>
      )}
    </div>
  )
}
