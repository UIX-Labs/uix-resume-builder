'use client'

import Spotlight from '@shared/icons/spotlight'
import { cn } from '@shared/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { RotateCcw, UploadIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { fetch } from '@shared/api'
import { RoastLoading } from './components/roast-loading'
import { TypewriterRoast } from './components/typewriter-roast'
import Fire from './components/fire'

export default function RoastPage() {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [response, setResponse] = useState<string | null>(null)

  const roastResume = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch<{ roast: string }>('resume/roast', {
        options: {
          method: 'POST',
          body: formData,
        },
      })
      return response
    } catch (error) {
      console.error('Error roasting resume:', error)
      throw new Error('Failed to roast resume')
    }
  }

  const { mutate: roastResumeMutation, isPending } = useMutation({
    mutationFn: roastResume,
    onSuccess: (data) => {
      toast.success('Resume roasted successfully')
      setResponse(data.roast)
    },
    onError: () => {
      toast.error('Failed to roast resume')
    },
  })

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  function handleFileUpload(file: File) {
    roastResumeMutation(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]

    if (file) {
      handleFileUpload(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const onUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='relative min-h-screen bg-white w-full overflow-hidden font-sans flex flex-col items-center'>
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:20px_20px]',
          '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
          'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]'
        )}
      />

      <Spotlight className='absolute inset-0' />

      <main className='relative z-10 w-full h-full min-h-screen pt-4'>
        <Link href='/' className='text-2xl font-[900] text-[rgb(11,10,9)] ml-5'>
          Resume Builder
        </Link>

        <div className='flex flex-col items-center justify-center w-full pt-20 pb-20 md:pb-5 px-5'>
          <div className='flex items-center gap-1 px-2 py-1 bg-[#02A44F] text-white rounded-full text-xs font-bold mb-8'>
            <span>AI Powered</span>

            <Image
              src='/images/auto_awesome.svg'
              alt='AI'
              width={14}
              height={14}
              className='inline-block'
            />
          </div>

          <h1 className='text-2xl lg:text-[40px] font-bold mb-4 leading-tight w-full md:w-1/2 text-center text-[#005FF2]'>
            🔥 Resume Roast 🔥
            <br />
            <span className='block -mt-2 lg:-mt-3 mx-auto rounded-full text-[#364153] font-medium backdrop-blur-xs bg-[#E3E3E3]/12 border border-white shadow-lg text-base lg:text-xl py-2 px-5 w-full'>
              Get your resume roasted (in a good way!) and discover what's
              holding you back from landing your dream job
            </span>
          </h1>

          {isPending ? (
            <div className='w-full md:w-1/2 mt-12'>
              <RoastLoading />
            </div>
          ) : response ? (
            <div className='w-full md:w-1/2 mt-8 pb-20 md:pb-5'>
              <TypewriterRoast
                content={response || ''}
                onRoastAnother={() => setResponse(null)}
              />
            </div>
          ) : (
            <>
              <div
                className={cn(
                  'bg-white/40 border-2 border-[#d1d5dc] border-dashed rounded-[16px] px-6 py-10 lg:px-[50px] lg:py-[40px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center transition-colors cursor-pointer mt-12 w-full md:w-1/2',
                  isDragging
                    ? 'border-[#005ff2] bg-blue-50/50'
                    : 'hover:bg-white/60'
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={onUploadClick}
              >
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className='hidden'
                  accept='.pdf'
                />

                <div className='bg-[#ebf3ff] w-14 h-14 rounded-full flex items-center justify-center mb-5'>
                  {/* Use the upload icon from Figma or a Lucide icon */}
                  <div className='relative w-7 h-7'>
                    <UploadIcon className='w-7 h-7' />
                  </div>
                </div>

                <h2 className='text-[#101828] text-[20px] font-semibold mb-2'>
                  Upload Your Resume
                </h2>
                <p className='text-gray-500 text-sm mb-4'>
                  Drag and drop your PDF here
                </p>
              </div>

              <p className='text-center text-sm text-[#4A5565] mt-4'>
                Don't have a resume yet?&nbsp;
                <Link
                  href='/dashboard'
                  className='text-[#005FF2] underline decoration-solid'
                >
                  Create one with PikaResume
                </Link>
              </p>
            </>
          )}
        </div>

        <div className='w-full relative lg:-my-5'>
          <Image
            src='/images/template-1.svg'
            alt='Resume Template 1'
            width={300}
            height={400}
            className='absolute top-[30%] left-[5%] md:left-[10%] w-[100px] md:w-[400px] opacity-70 rotate-[15deg] z-[-1]'
          />
          <Image
            src='/images/template-2.svg'
            alt='Resume Template 2'
            width={300}
            height={400}
            className='absolute top-[30%] right-[25%] md:right-[30%] w-[100px] md:w-[400px] opacity-70 rotate-[-15deg] z-[-1]'
          />
          <Image
            src='/images/template-3.svg'
            alt='Resume Template 3'
            width={280}
            height={350}
            className='absolute top-[30%] left-[25%] md:left-[70%] w-[100px] md:w-[350px] opacity-70 rotate-[5deg] z-[-1]'
          />

          <Fire className='w-full scale-x-110' />
        </div>
      </main>
    </div>
  )
}
