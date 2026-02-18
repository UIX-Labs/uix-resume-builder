'use client';

import Image from "next/image";

interface NotFoundPageProps {
    color: string;
}

export default function NotFoundPage({ color }: NotFoundPageProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            
            <div className="relative w-full max-w-[600px] h-[300px] sm:h-[400px] overflow-hidden">
                <Image 
                    src="/images/blog/not-found-img.png" 
                    alt="not-found-img" 
                    fill  
                    priority
                    className="object-cover" 
                />
            </div>

            <div className="text-xl sm:text-3xl flex flex-col items-center justify-center w-full mt-6 font-bold leading-tight text-center px-4">
                <span>We’re building something useful here.</span>
                <span style={{ color: color }}>Coming soon.</span>
            </div>

            <button onClick={() => window.location.href = "/"} className="mt-6 px-6 py-3 bg-[#004EF8] text-white rounded-lg hover:bg-[#004EF8]/80 transition-colors w-[185px] h-[50px] text-lg font-semibold">
                Back to Home
            </button>
        </div>
    )
}