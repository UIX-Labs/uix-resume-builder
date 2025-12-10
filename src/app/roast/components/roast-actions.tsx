import { Button } from '@shared/ui'
import { Download, RotateCcw, Share2, Sparkles, Wand2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cn } from '@shared/lib/utils'

interface RoastActionsProps {
  onShare: () => void
  onDownload: () => void
  onRoastAnother: () => void
  isShareAvailable: boolean
}

export function RoastActions({
  onShare,
  onDownload,
  onRoastAnother,
  isShareAvailable,
}: RoastActionsProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='mt-8 w-full max-w-2xl mx-auto'
    >
      <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 text-center space-y-8'>
        <div className='space-y-2'>
          <h3 className='text-2xl font-bold text-[#005FF2]'>
            Roast Served! 🍽️
          </h3>
          <p className='text-slate-600 font-medium'>
            Now go fix that resume! (We can help with that)
          </p>
        </div>

        <div className='flex flex-col gap-6'>
          {/* Primary Actions - Share & Download */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
            {isShareAvailable && (
              <Button
                size='lg'
                onClick={onShare}
                className='w-full sm:w-auto min-w-[160px] bg-[#005FF2] hover:bg-[#004dc7] text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5'
              >
                <Share2 className='w-4 h-4 mr-2' />
                Share Roast
              </Button>
            )}

            <Button
              size='lg'
              onClick={onDownload}
              variant={isShareAvailable ? 'outline' : 'default'}
              className={cn(
                'w-full sm:w-auto min-w-[160px] transition-all hover:-translate-y-0.5',
                !isShareAvailable
                  ? 'bg-[#005FF2] hover:bg-[#004dc7] text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              <Download className='w-4 h-4 mr-2' />
              Download
            </Button>
          </div>

          {/* Divider */}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-slate-100' />
            </div>
            <div className='relative flex justify-center text-xs uppercase tracking-wider'>
              <span className='bg-white px-3 text-slate-400 font-semibold'>
                What's Next
              </span>
            </div>
          </div>

          {/* Secondary Actions - Navigation */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap'>
            <Button
              variant='outline'
              className='relative w-full sm:w-auto min-w-[180px] h-11 border-slate-200 text-slate-400 bg-slate-50/50 cursor-not-allowed hover:bg-slate-50/50 hover:text-slate-400'
            >
              <Wand2 className='w-4 h-4 mr-2' />
              <span>Fix & Download</span>
              <span className='absolute -top-2.5 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm animate-pulse'>
                Coming Soon
              </span>
            </Button>

            <Button
              variant='outline'
              onClick={() => router.push('/dashboard')}
              className='w-full sm:w-auto min-w-[180px] h-11 border-slate-200 text-slate-700 hover:border-[#005FF2] hover:text-[#005FF2] hover:bg-blue-50/50 group'
            >
              <Sparkles className='w-4 h-4 mr-2 text-[#005FF2] transition-transform group-hover:scale-110' />
              Create My Resume
            </Button>

            <Button
              variant='ghost'
              onClick={onRoastAnother}
              className='w-full sm:w-auto text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            >
              <RotateCcw className='w-4 h-4 mr-2' />
              Roast Another
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
