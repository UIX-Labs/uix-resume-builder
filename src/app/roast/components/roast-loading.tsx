'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Search, Sparkles } from 'lucide-react'

import Fire from './fire'

export function RoastLoading() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-[400px] relative overflow-hidden rounded-2xl bg-slate-50/50 border border-slate-100'>
      {/* Background Grid Pattern - subtle */}
      <div
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Animated Fire Background */}
      <div className='absolute bottom-0 left-0 right-0 h-48 w-full z-0 opacity-10 pointer-events-none'>
        <Fire className='w-full h-full' />
      </div>

      <div className='relative z-10'>
        {/* Resume Paper Representation */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className='relative w-32 h-44 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden flex flex-col p-4'
        >
          {/* Header */}
          <div className='flex gap-3 mb-4'>
            <div className='w-8 h-8 rounded-full bg-slate-100' />
            <div className='flex-1 space-y-1 py-1'>
              <div className='h-2 bg-slate-200 rounded w-3/4' />
              <div className='h-1.5 bg-slate-100 rounded w-1/2' />
            </div>
          </div>
          {/* Body Lines */}
          <div className='space-y-2 flex-1'>
            <div className='h-1.5 bg-slate-100 rounded w-full' />
            <div className='h-1.5 bg-slate-100 rounded w-5/6' />
            <div className='h-1.5 bg-slate-100 rounded w-full' />
            <div className='h-1.5 bg-slate-100 rounded w-4/5' />
            <div className='mt-4 h-1.5 bg-slate-100 rounded w-full' />
            <div className='h-1.5 bg-slate-100 rounded w-3/4' />
          </div>

          {/* Floating Fire Emojis (The Roast) */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`fire-${i}`}
              className='absolute z-10 text-2xl'
              style={{
                bottom: -10,
                left: i === 0 ? '10%' : i === 1 ? '45%' : '80%',
              }}
              animate={{
                y: [0, -120],
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.5],
                rotate: [0, i % 2 === 0 ? 10 : -10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeOut',
              }}
            >
              {/* Removed emoji to avoid double fire effect with the background */}
            </motion.div>
          ))}

          {/* Floating 'Analysis' Icons appearing */}
          <motion.div
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: 0.5,
              times: [0, 0.2, 1],
            }}
            className='absolute top-10 right-2 text-red-400'
          >
            <AlertCircle size={16} />
          </motion.div>

          <motion.div
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: 1.2,
              times: [0, 0.2, 1],
            }}
            className='absolute bottom-12 left-2 text-green-500'
          >
            <CheckCircle2 size={16} />
          </motion.div>

          {/* Scanning Line */}
          <motion.div
            className='absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80 z-20'
            style={{ filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))' }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          />
        </motion.div>

        {/* Magnifying Glass Searching */}
        <motion.div
          className='absolute -right-6 -bottom-2 text-blue-600 z-30 drop-shadow-lg'
          animate={{
            x: [-10, 10, -10],
            y: [-5, 5, -5],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          <div className='bg-white p-2 rounded-full shadow-lg border border-blue-100'>
            <Search size={24} />
          </div>
        </motion.div>

        {/* Sparkles */}
        <motion.div
          className='absolute -left-8 -top-4 text-yellow-500'
          animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Sparkles size={24} />
        </motion.div>
      </div>

      <div className='mt-10 flex flex-col items-center gap-3 z-10'>
        <div className='flex items-center gap-2 px-4 py-2 bg-white text-blue-700 rounded-full shadow-sm border border-blue-100'>
          <div className='flex gap-1.5'>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ height: ['4px', '12px', '4px'] }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  delay: i * 0.15,
                }}
                className='w-1 bg-blue-600 rounded-full'
              />
            ))}
          </div>
          <span className='text-sm font-semibold ml-1'>
            Cooking up a roast...
          </span>
        </div>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className='text-slate-500 text-sm font-medium'
        >
          Looking for missed opportunities & cringe moments 🕵️‍♂️
        </motion.p>
      </div>
    </div>
  )
}
