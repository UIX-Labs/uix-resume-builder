'use client'

import { cn } from '@shared/lib/utils'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import { Link, RotateCcw, Share2, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import PikaResume from '@shared/icons/pika-resume'

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

export function TypewriterRoast({
  content,
  onRoastAnother,
}: {
  content: string
  onRoastAnother: () => void
}) {
  const [activeLineIndex, setActiveLineIndex] = useState(0)
  const router = useRouter()
  const roastRef = useRef<HTMLDivElement>(null)

  // Parse content into lines, handling the markdown bullet points
  // Split by newline, but sometimes markdown has soft wraps.
  // Assuming the roast comes as * Item \n * Item
  const lines = content.split('\n').filter((line) => line.trim().length > 0)

  const handleShare = async () => {
    if (!roastRef.current) return

    try {
      const canvas = await html2canvas(roastRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        onclone: (clonedDoc) => {
          const element = clonedDoc.getElementById('roast-card-content')
          if (element) {
            // Force simple styles to avoid unsupported color functions like oklab
            element.style.backgroundColor = '#ffffff'
            element.style.backdropFilter = 'none'
            element.style.boxShadow = 'none'
            element.style.border = '1px solid #e2e8f0'
            element.style.color = '#334155'
            element.style.position = 'relative'
            element.style.overflow = 'hidden' // Ensure watermark doesn't spill
          }

          const watermark = clonedDoc.getElementById('roast-watermark')
          if (watermark) {
            watermark.style.opacity = '0.05'
          }
        },
        ignoreElements: (element) => element.classList.contains('cursor-blink'),
      })

      const image = canvas.toDataURL('image/png')

      // Convert Data URL to Blob for Web Share API
      const response = await fetch(image)
      const blob = await response.blob()
      const file = new File([blob], 'pika-resume-roast.png', {
        type: 'image/png',
      })

      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'My Resume Roast by PikaResume 🔥',
            text: 'I just got my resume roasted by AI! Check out what it said... 💀 #PikaResume #ResumeRoast',
            files: [file],
          })
          toast.success('Shared successfully!')
        } catch (shareError) {
          // If user cancels share or it fails, fallback to download isn't usually desired unless it's a technical error
          // But usually we just log it. If it's an abort, no action needed.
          if ((shareError as Error).name !== 'AbortError') {
            console.error(
              'Web Share API failed, falling back to download',
              shareError
            )
            downloadImage(image)
          }
        }
      } else {
        // Fallback for browsers that don't support file sharing
        downloadImage(image)
      }
    } catch (error) {
      console.error('Share failed:', error)
      toast.error('Failed to generate image')
    }
  }

  const downloadImage = (dataUrl: string) => {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'pika-resume-roast.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Roast downloaded! Ready to share.')
  }

  return (
    <div className='w-full max-w-3xl mx-auto'>
      <div
        ref={roastRef}
        id='roast-card-content'
        className='relative overflow-hidden space-y-4 font-mono text-base md:text-lg leading-relaxed text-slate-700 p-6 md:p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm'
      >
        {/* Watermark Background */}
        <div
          id='roast-watermark'
          className='absolute inset-0 pointer-events-none z-0 flex flex-wrap gap-12 p-8 opacity-[0.03] select-none overflow-hidden items-center justify-center'
          aria-hidden='true'
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className='text-6xl transform rotate-12'>
              🔥
            </span>
          ))}
          <div className='absolute inset-0 flex items-center justify-center opacity-20'>
            <PikaResume width={400} height={400} />
          </div>
        </div>

        <div className='relative z-10 flex items-center gap-3 mb-6 text-slate-500 text-sm font-bold tracking-widest uppercase border-b border-slate-200 pb-4'>
          <PikaResume width={24} height={24} />
          <span>Resume Roast</span>
          <span className='text-slate-300 mx-2'>|</span>
          <span className='text-blue-600'>PikaResume.com</span>
        </div>

        <div className='relative z-10'>
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
                className={cn(
                  'flex items-start gap-3 mb-3',
                  isBullet ? 'pl-2' : ''
                )}
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
        </div>
      </div>

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

          <div className='mt-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10'>
            <button
              type='button'
              onClick={handleShare}
              className='text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors flex items-center gap-2 font-medium cursor-pointer'
            >
              <Share2 className='w-4 h-4' />
              Share Roast
            </button>

            <button
              type='button'
              onClick={onRoastAnother}
              className='text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors flex items-center gap-2 font-medium cursor-pointer'
            >
              <RotateCcw className='w-4 h-4' />
              Roast another
            </button>

            <button
              type='button'
              onClick={() => router.push('/dashboard')}
              className='text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors flex items-center gap-2 font-medium cursor-pointer'
            >
              <Sparkles className='w-4 h-4' />
              <span>Create My Resume</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
