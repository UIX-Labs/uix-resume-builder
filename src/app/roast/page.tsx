'use client'

import Spotlight from '@shared/icons/spotlight'
import { cn } from '@shared/lib/utils'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { fetch } from '@shared/api'
import { RoastLoading } from './components/roast-loading'
import { TypewriterRoast } from './components/typewriter-roast'

const roast =
  '*   Okay, let\'s dissect this resume. 🚩 First off, the formatting is giving... 2008? Like, seriously, the bolding and the spacing scream "my uncle made this." 💀\n*   The "Boomer energy" is STRONG. "Experienced with HTML5, CSS, JavaScript, and React.js." Yeah, no duh, Nikhil. That\'s like saying you know how to breathe. 🙄\n*   This "PROFILE" section is peak "pick me" energy. "A passionate learner... that enjoys building scalable web applications and working with individuals in this learning field." It\'s giving "please notice me, senpai." Sir, this is a Wendy\'s. 😩\n*   "Technical Skills"? More like "Things Anyone With Google Can List." "Git"? "VS Code"? Did you also list "turning on your computer"? 🤦‍♀️\n*   "Concepts: OOP, DSA." Wow, ground-breaking. Are you also going to list "thinking"? 🤯\n*   The project descriptions are trying SO hard. "Created a responsive personal portfolio that displayed various projects along with technical skills and achievements." Groundbreaking research, truly. 👏\n*   "Developed a Single Page Application (SPA) with React Router for smooth navigation through the pages which utilizes reusable components." My dude, that\'s literally what React Router does. 🥱\n*   "Created a completely responsive user interface for the portfolio using Tailwind CSS for a good-looking theme and accessible usage on devices." You don\'t say? That\'s... the point of Tailwind? 🙃\n*   "AI Notes Summarizer" - Okay, this one\'s kinda fuego 🔥. LLaMA and Tesseract? Spicy. But the description is still a bit... textbook. "Applied deep learning and natural language processing methods and techniques." We get it, you read the Wikipedia page. ✨\n*   "CurrencyConverter" - "Provided a reliable and accurate application." Did you invent reliability? Because that\'s the whole job, sweetie. 💅\n*   "Dice Roll Game" - "Developed a thrilling Dice Roll Game in React.js." Thrilling? Is it going to win me the lottery? Because my current dice roll game (my actual life) is not thrilling. 🎲\n*   "Implemented Math.random() functionality to produce random outcomes and maintain state with useState." This is where I cackle. 😂 You implemented `Math.random()`? Truly a pioneer. 🚀\n*   "Bachelor of Technology - BTech in Computer Science and Artificial Intelligence, ABES Institute Of Technology, Ghaziabad 2022-2026." So you\'re still in school? Got it. "Experienced" just got a whole new meaning. 🫠\n*   "Certificates"? "Introduction to Deep Learning"? "Java Programming"? These are participation trophies, bestie. 🏆\n*   Overall, this resume is giving "trying too hard to sound smart" and not enough "I can actually do the thing." Main character energy, but make it corporate cringe. 💀'

export default function RoastPage() {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [response, setResponse] = useState<string | null>(roast)

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

      <main className='relative z-10 flex flex-col items-center justify-center w-full h-full min-h-screen py-20'>
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

        <h1 className='text-[40px] font-bold mb-4 leading-tight w-4/5 md:w-1/2 text-center text-[#005FF2]'>
          🔥 Resume Roast 🔥
          <br />
          <span className='block -mt-3 mx-auto rounded-full text-[#364153] font-medium backdrop-blur-xs bg-[#E3E3E3]/12 border border-white shadow-lg text-xl py-2 px-5'>
            Get your resume roasted (in a good way!) and discover what's holding
            you back from landing your dream job
          </span>
        </h1>

        {isPending ? (
          <div className='w-4/5 md:w-1/2 mt-12'>
            <RoastLoading />
          </div>
        ) : response ? (
          <div className='w-4/5 md:w-1/2 mt-8 pb-20'>
            <TypewriterRoast content={response} />

            <div className='mt-8 flex justify-center'>
              <button
                type='button'
                onClick={() => setResponse(null)}
                className='text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors flex items-center gap-2'
              >
                <div className='relative w-4 h-4'>
                  <Image
                    src='/images/roast/upload-icon.svg'
                    alt='Upload'
                    fill
                    className='object-contain'
                    unoptimized
                  />
                </div>
                Roast another resume
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className={cn(
                'bg-white/40 border-2 border-[#d1d5dc] border-dashed rounded-[16px] px-6 py-10 lg:px-[50px] lg:py-[40px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center transition-colors cursor-pointer mt-12 w-4/5 md:w-1/2',
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
                  <Image
                    src='/images/roast/upload-icon.svg'
                    alt='Upload'
                    fill
                    className='object-contain'
                    unoptimized
                  />
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
      </main>
    </div>
  )
}
