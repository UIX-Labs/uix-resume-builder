import { cn } from '@shared/lib/utils'
import { motion } from 'framer-motion'
import PikaResume from '@shared/icons/pika-resume'
import { TypewriterLine } from './typewriter-line'
import { forwardRef } from 'react'

interface RoastCardProps {
  lines: string[]
  activeLineIndex: number
  onLineComplete: () => void
}

export const RoastCard = forwardRef<HTMLDivElement, RoastCardProps>(
  ({ lines, activeLineIndex, onLineComplete }, ref) => {
    return (
      <div
        ref={ref}
        id='roast-card-content'
        className='relative overflow-hidden space-y-4 font-mono text-base md:text-lg leading-relaxed text-slate-700 p-6 md:p-8 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm'
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
          <span className='text-[#005FF2]'>PikaResume.com</span>
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
                      onComplete={onLineComplete}
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
    )
  }
)

RoastCard.displayName = 'RoastCard'

