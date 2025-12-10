'use client'

import { useRef, useState } from 'react'
import { RoastCard } from './roast-card'
import { RoastActions } from './roast-actions'
import { useRoastSharing } from '../hooks/use-roast-sharing'

export function TypewriterRoast({
  content,
  onRoastAnother,
}: {
  content: string
  onRoastAnother: () => void
}) {
  const [activeLineIndex, setActiveLineIndex] = useState(0)
  const roastRef = useRef<HTMLDivElement>(null)

  const { isShareAvailable, handleShare, downloadImage } = useRoastSharing({
    roastRef,
  })

  // Parse content into lines, handling the markdown bullet points
  // Split by newline, but sometimes markdown has soft wraps.
  // Assuming the roast comes as * Item \n * Item
  const lines = content.split('\n').filter((line) => line.trim().length > 0)

  return (
    <div className='w-full max-w-3xl mx-auto'>
      <RoastCard
        ref={roastRef}
        lines={lines}
        activeLineIndex={activeLineIndex}
        onLineComplete={() => setActiveLineIndex((prev) => prev + 1)}
      />

      {activeLineIndex === lines.length && (
        <RoastActions
          onShare={handleShare}
          onDownload={downloadImage}
          onRoastAnother={onRoastAnother}
          isShareAvailable={isShareAvailable}
        />
      )}
    </div>
  )
}
