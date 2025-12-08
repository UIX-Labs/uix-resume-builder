'use client';
import { WhyWeStarted } from '@features/resume-journey/why-we-started';
import { HumanAiApproach } from '@features/resume-journey/human-ai-approach';
import { TheCommunity } from '@features/resume-journey/the-community';
import { SuccessStories } from '@features/resume-journey/success-stories';
import { VisionSection } from '@features/resume-journey/vision-section';
import { useEffect, useRef, useState } from 'react';

export function JourneyTimeline() {
    const threadPathRefs = useRef<(SVGPathElement | null)[]>([]);
    const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const timelineContainerRef = useRef<HTMLDivElement | null>(null);
    const mobileThreadRef = useRef<SVGPathElement | null>(null);
    const mobileCircleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visibleSections, setVisibleSections] = useState(new Set());

    useEffect(() => {
        // Desktop SVG animation
        const pathLengths = threadPathRefs.current.map((path) => {
            if (path) {
                const length = path.getTotalLength();
                path.style.strokeDasharray = `${length}`;
                path.style.strokeDashoffset = `${length}`;
                return length;
            }
            return 0;
        });

        const totalLength = pathLengths.reduce((sum, length) => sum + length, 0);
        const cumulativeLengths = pathLengths.reduce<number[]>((acc, length, index) => {
            const prevTotal = index === 0 ? 0 : acc[index - 1];
            acc.push(prevTotal + length);
            return acc;
        }, []);

        // Mobile thread animation setup
        if (mobileThreadRef.current) {
            const mobileLength = mobileThreadRef.current.getTotalLength();
            mobileThreadRef.current.style.strokeDasharray = `${mobileLength}`;
            mobileThreadRef.current.style.strokeDashoffset = `${mobileLength}`;
        }

        const updateThread = () => {
            // Desktop animation
            if (timelineContainerRef.current) {
                const rect = timelineContainerRef.current.getBoundingClientRect();
                const timelineTop = rect.top;
                const timelineHeight = rect.height;
                const windowHeight = window.innerHeight;

                const viewportCenter = windowHeight / 2;
                const timelineStart = timelineTop + timelineHeight * 0.1;
                const timelineEnd = timelineTop + timelineHeight * 0.9;
                const scrollProgress =
                    (viewportCenter - timelineStart) / (timelineEnd - timelineStart);
                const scrollPercentage = Math.max(0, Math.min(scrollProgress, 1));

                const drawTotal = totalLength * scrollPercentage;

                threadPathRefs.current.forEach((path, index) => {
                    if (path && pathLengths[index]) {
                        const pathStart = index === 0 ? 0 : cumulativeLengths[index - 1];
                        const pathProgress = Math.max(
                            0,
                            Math.min(drawTotal - pathStart, pathLengths[index])
                        );
                        path.style.strokeDashoffset = `${pathLengths[index] - pathProgress}`;
                    }
                });

                circleRefs.current.forEach((circle, index) => {
                    if (circle) {
                        const circleThreshold =
                            index / Math.max(1, circleRefs.current.length - 1);
                        if (scrollPercentage >= circleThreshold * 0.95) {
                            circle.style.opacity = '1';
                        } else {
                            circle.style.opacity = '0';
                        }
                    }
                });
            }

            // Mobile animation
            if (mobileThreadRef.current) {
                const mobileContainer = mobileThreadRef.current.closest('.mobile-timeline-container');
                if (mobileContainer) {
                    const rect = mobileContainer.getBoundingClientRect();
                    const containerTop = rect.top;
                    const containerHeight = rect.height;
                    const windowHeight = window.innerHeight;

                    const viewportCenter = windowHeight / 2;
                    const containerStart = containerTop + containerHeight * 0.05;
                    const containerEnd = containerTop + containerHeight * 0.95;
                    const scrollProgress =
                        (viewportCenter - containerStart) / (containerEnd - containerStart);
                    const scrollPercentage = Math.max(0, Math.min(scrollProgress, 1));

                    const mobileLength = mobileThreadRef.current.getTotalLength();
                    const drawAmount = mobileLength * scrollPercentage;
                    mobileThreadRef.current.style.strokeDashoffset = `${mobileLength - drawAmount}`;

                    // Animate mobile circles
                    mobileCircleRefs.current.forEach((circle, index) => {
                        if (circle) {
                            const circleThreshold = (index + 1) / 5;
                            if (scrollPercentage >= circleThreshold * 0.9) {
                                circle.style.opacity = '1';
                                circle.style.transform = 'scale(1)';
                            } else {
                                circle.style.opacity = '0';
                                circle.style.transform = 'scale(0.5)';
                            }
                        }
                    });
                }
            }
        };

        const checkSections = () => {
            const newVisible = new Set(visibleSections);

            sectionRefs.current.forEach((section, index) => {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight * 0.75;

                    if (isVisible) {
                        newVisible.add(index);
                    }
                }
            });

            if (newVisible.size !== visibleSections.size) {
                setVisibleSections(newVisible);
            }
        };

        const handleScroll = () => {
            updateThread();
            checkSections();
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleSections]);

    const setMobileCircleRef = (index: number) => (el: HTMLDivElement | null) => {
        mobileCircleRefs.current[index] = el;
    };

    const setThreadPathRef = (index: number) => (el: SVGPathElement | null) => {
        threadPathRefs.current[index] = el;
    };

    const setCircleRef = (index: number) => (el: SVGCircleElement | null) => {
        circleRefs.current[index] = el;
    };

    return (
        <section className="w-full py-8 md:py-16 lg:py-24">
            {/* Intro text - Desktop */}
            <div className="hidden lg:block max-w-[540px] ml-auto mr-[17%] mb-6">
                <p
                    className="text-[18px] text-[#0C1118]"
                    style={{
                        fontFamily: 'Geist, sans-serif',
                    }}
                >
                    Most people don't open a resume builder in a happy mood. They're
                    stressed, uncertain, and looking for a way out - not just better
                    grammar or keywords.
                </p>
                <p className="text-[18px] text-[#0C1118]">
                    That's where we saw the gap no one was solving.
                </p>
            </div>

            {/* Intro text - Mobile/Tablet */}
            <div className="lg:hidden px-4 mb-8">
                <p
                    className="text-sm sm:text-base md:text-lg text-[#0C1118] text-center max-w-[600px] mx-auto"
                    style={{
                        fontFamily: 'Geist, sans-serif',
                    }}
                >
                    Most people don't open a resume builder in a happy mood. They're
                    stressed, uncertain, and looking for a way out - not just better
                    grammar or keywords.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-[#0C1118] text-center max-w-[600px] mx-auto mt-2">
                    That's where we saw the gap no one was solving.
                </p>
            </div>

            {/* Mobile Timeline with vertical thread */}
            <div className="lg:hidden px-4 mobile-timeline-container">
                <div className="relative flex flex-col gap-12 max-w-[600px] mx-auto">
                    {/* Vertical Thread SVG - Background */}
                    <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-[2px]">
                        {/* Gray background line */}
                        <div className="absolute inset-0 bg-[#D1D5DB]" />
                        {/* Green animated line */}
                        <svg
                            className="absolute inset-0 w-full h-full"
                            preserveAspectRatio="none"
                            aria-label="Journey progress indicator"
                        >
                            <title>Journey Progress</title>
                            <path
                                ref={mobileThreadRef}
                                d="M1 0 L1 100%"
                                stroke="#309F66"
                                strokeWidth="2"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>

                    {/* Section 1: Why We Started */}
                    <div className="relative pl-10 sm:pl-14">
                        {/* Circle indicator */}
                        <div
                            ref={setMobileCircleRef(0)}
                            className="absolute left-[10px] sm:left-[18px] top-[20px] w-4 h-4 rounded-full bg-[#309F66] border-2 border-white shadow-md transition-all duration-300"
                            style={{ opacity: 0, transform: 'scale(0.5)' }}
                        />
                        <div className="flex items-center gap-3 mb-4">
                            <span className="font-serif text-[24px] sm:text-[32px] font-bold text-[#309F66] opacity-80">
                                01
                            </span>
                            <span className="font-serif text-[18px] sm:text-[24px] font-bold text-[#309F66] opacity-80">
                                problem
                            </span>
                        </div>
                        <WhyWeStarted />
                    </div>

                    {/* Section 2: Human + AI Approach */}
                    <div className="relative pl-10 sm:pl-14">
                        <div
                            ref={setMobileCircleRef(1)}
                            className="absolute left-[10px] sm:left-[18px] top-[20px] w-4 h-4 rounded-full bg-[#57B083] border-2 border-white shadow-md transition-all duration-300"
                            style={{ opacity: 0, transform: 'scale(0.5)' }}
                        />
                        <div className="flex items-center gap-3 mb-4">
                            <span className="font-serif text-[24px] sm:text-[32px] font-bold text-[#57B083] opacity-80">
                                02
                            </span>
                        </div>
                        <HumanAiApproach />
                    </div>

                    {/* Section 3: The Community */}
                    <div className="relative pl-10 sm:pl-14">
                        <div
                            ref={setMobileCircleRef(2)}
                            className="absolute left-[10px] sm:left-[18px] top-[20px] w-4 h-4 rounded-full bg-[#57B083] border-2 border-white shadow-md transition-all duration-300"
                            style={{ opacity: 0, transform: 'scale(0.5)' }}
                        />
                        <div className="flex items-center gap-3 mb-4">
                            <span className="font-serif text-[24px] sm:text-[32px] font-bold text-[#57B083] opacity-80">
                                03
                            </span>
                        </div>
                        <TheCommunity />
                    </div>

                    {/* Section 4: Success Stories */}
                    <div className="relative pl-10 sm:pl-14">
                        <div
                            ref={setMobileCircleRef(3)}
                            className="absolute left-[10px] sm:left-[18px] top-[20px] w-4 h-4 rounded-full bg-[#57B083] border-2 border-white shadow-md transition-all duration-300"
                            style={{ opacity: 0, transform: 'scale(0.5)' }}
                        />
                        <div className="flex items-center gap-3 mb-4">
                            <span className="font-serif text-[24px] sm:text-[32px] font-bold text-[#57B083] opacity-80">
                                04
                            </span>
                        </div>
                        <SuccessStories />
                    </div>

                    {/* Section 5: Vision */}
                    <div className="relative pl-10 sm:pl-14">
                        <div
                            ref={setMobileCircleRef(4)}
                            className="absolute left-[10px] sm:left-[18px] top-[20px] w-4 h-4 rounded-full bg-[#57B083] border-2 border-white shadow-md transition-all duration-300"
                            style={{ opacity: 0, transform: 'scale(0.5)' }}
                        />
                        <div className="flex items-center gap-3 mb-4">
                            <span className="font-serif text-[24px] sm:text-[32px] font-bold text-[#57B083] opacity-80">
                                05
                            </span>
                        </div>
                        <VisionSection />
                    </div>
                </div>
            </div>

            {/* Desktop Timeline with SVG */}
            <div className="hidden lg:block w-full max-w-[1272px]">
                <div
                    ref={timelineContainerRef}
                    className="relative w-full aspect-[1272.05/1961.41]"
                >
                    {/* Background curved line SVG */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            width="1275"
                            height="1964"
                            viewBox="0 0 1275 1964"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="Timeline path background"
                        >
                            <title>Timeline Background</title>
                            <circle
                                cx="863.271"
                                cy="29.5"
                                r="6.5"
                                fill="#D1D5DB"
                            />
                            <circle
                                cx="1004.27"
                                cy="308.5"
                                r="6.5"
                                fill="#D1D5DB"
                            />
                            <path
                                d="M866.771 465.5C721.771 497 473.171 463.7 438.771 614.5"
                                stroke="#D1D5DB"
                                strokeWidth="4"
                            />
                            <path
                                d="M863.271 36C860.438 72.6667 882.471 152 993.271 176C1131.77 206 1249.77 160.5 1265.27 129C1280.77 97.5 1272.27 65 1224.27 50.5C1176.27 36 1002.77 51 1008.77 226.5C1014.77 402 923.771 451.5 863.271 466"
                                stroke="#D1D5DB"
                                strokeWidth="4"
                            />
                            <path
                                d="M438.271 625C437.771 663.333 428.471 700.2 319.271 741C182.771 792 214.044 934.826 262.771 972C311.271 1009 441.772 1065.23 505.271 922C550.271 820.5 674.271 892 603.271 1013"
                                stroke="#D1D5DB"
                                strokeWidth="4"
                            />
                            <circle
                                cx="601.271"
                                cy="1018.5"
                                r="6.5"
                                fill="#D1D5DB"
                            />
                            <path
                                d="M597.771 1023.5C563.437 1075.33 547.771 1191.9 753.771 1239.5C1011.27 1299 1035.77 1355.5 966.771 1377.5C897.771 1399.5 853.771 1306.5 1008.77 1313.5C1132.77 1319.1 1127.27 1383.67 1110.77 1416"
                                stroke="#D1D5DB"
                                strokeWidth="4"
                            />
                            <path
                                d="M1107.27 1426.5C1091.44 1468.67 1020.17 1579 863.771 1679C668.271 1804 597.771 1767 574.771 1744C516.771 1689.5 679.271 1650 716.271 1703.5C753.271 1757 651.771 1860.5 603.271 1882.5"
                                stroke="#D1D5DB"
                                strokeWidth="4"
                            />
                            <circle
                                cx="600.271"
                                cy="1885.5"
                                r="6.5"
                                fill="#D1D5DB"
                            />
                            <path
                                d="M594.771 1887C498.604 1921 245.871 1985.6 0.270996 1952"
                                stroke="#D1D5DB"
                                strokeWidth="4"
                            />
                            <circle
                                cx="1109.27"
                                cy="1421.5"
                                r="6.5"
                                fill="#D1D5DB"
                            />
                            <circle
                                cx="438.271"
                                cy="619.5"
                                r="6.5"
                                fill="#D1D5DB"
                            />
                        </svg>

                        {/* Animated Green Thread */}
                        <svg
                            width="1275"
                            height="1964"
                            viewBox="0 0 1275 1964"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0"
                            aria-label="Animated timeline progress"
                        >
                            <title>Timeline Progress</title>
                            <circle
                                ref={setCircleRef(0)}
                                cx="863.271"
                                cy="29.5"
                                r="6.5"
                                fill="#309F66"
                                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                            />
                            <circle
                                ref={setCircleRef(1)}
                                cx="1004.27"
                                cy="308.5"
                                r="6.5"
                                fill="#309F66"
                                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                            />
                            <path
                                ref={setThreadPathRef(0)}
                                d="M866.771 465.5C721.771 497 473.171 463.7 438.771 614.5"
                                stroke="#309F66"
                                strokeWidth="4"
                            />
                            <path
                                ref={setThreadPathRef(1)}
                                d="M863.271 36C860.438 72.6667 882.471 152 993.271 176C1131.77 206 1249.77 160.5 1265.27 129C1280.77 97.5 1272.27 65 1224.27 50.5C1176.27 36 1002.77 51 1008.77 226.5C1014.77 402 923.771 451.5 863.271 466"
                                stroke="#309F66"
                                strokeWidth="4"
                            />
                            <path
                                ref={setThreadPathRef(2)}
                                d="M438.271 625C437.771 663.333 428.471 700.2 319.271 741C182.771 792 214.044 934.826 262.771 972C311.271 1009 441.772 1065.23 505.271 922C550.271 820.5 674.271 892 603.271 1013"
                                stroke="#309F66"
                                strokeWidth="4"
                            />
                            <circle
                                ref={setCircleRef(2)}
                                cx="601.271"
                                cy="1018.5"
                                r="6.5"
                                fill="#309F66"
                                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                            />
                            <path
                                ref={setThreadPathRef(3)}
                                d="M597.771 1023.5C563.437 1075.33 547.771 1191.9 753.771 1239.5C1011.27 1299 1035.77 1355.5 966.771 1377.5C897.771 1399.5 853.771 1306.5 1008.77 1313.5C1132.77 1319.1 1127.27 1383.67 1110.77 1416"
                                stroke="#309F66"
                                strokeWidth="4"
                            />
                            <path
                                ref={setThreadPathRef(4)}
                                d="M1107.27 1426.5C1091.44 1468.67 1020.17 1579 863.771 1679C668.271 1804 597.771 1767 574.771 1744C516.771 1689.5 679.271 1650 716.271 1703.5C753.271 1757 651.771 1860.5 603.271 1882.5"
                                stroke="#309F66"
                                strokeWidth="4"
                            />
                            <circle
                                ref={setCircleRef(3)}
                                cx="600.271"
                                cy="1885.5"
                                r="6.5"
                                fill="#309F66"
                                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                            />
                            <path
                                ref={setThreadPathRef(5)}
                                d="M594.771 1887C498.604 1921 245.871 1985.6 0.270996 1952"
                                stroke="#309F66"
                                strokeWidth="4"
                            />
                            <circle
                                ref={setCircleRef(4)}
                                cx="1109.27"
                                cy="1421.5"
                                r="6.5"
                                fill="#309F66"
                                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                            />
                            <circle
                                ref={setCircleRef(5)}
                                cx="438.271"
                                cy="619.5"
                                r="6.5"
                                fill="#309F66"
                                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                            />
                        </svg>
                    </div>

                    <div
                        className="absolute left-[69.3%] top-[0%] font-serif text-[44px] font-bold 
                       leading-[1.15em] tracking-[-0.02em] text-[#309F66] opacity-80"
                    >
                        problem
                    </div>

                    <div
                        className="absolute left-[80.4%] top-[14.6%] font-serif text-[44px] font-bold 
                       leading-[1.15em] tracking-[-0.02em] text-[#309F66] opacity-80"
                    >
                        01
                    </div>

                    <div className="absolute left-[18%] top-[8%] w-[42%]">
                        <WhyWeStarted />
                    </div>

                    <div
                        className="absolute left-[36%] top-[30.4%] font-serif text-[44px] font-bold 
                       leading-[1.15em] tracking-[-0.02em] text-[#57B083] opacity-80"
                    >
                        02
                    </div>

                    <div className="absolute left-[57%] top-[33%] w-[53%]">
                        <HumanAiApproach />
                    </div>

                    <div
                        className="absolute left-[48.8%] top-[50.8%] font-serif text-[44px] font-bold 
                       leading-[1.15em] tracking-[-0.02em] text-[#57B083] opacity-80"
                    >
                        03
                    </div>

                    <div className="absolute left-[65%] top-[48%] w-[44%]">
                        <TheCommunity />
                    </div>

                    <div
                        className="absolute left-[88.7%] top-[71.3%] font-serif text-[44px] font-bold 
                       leading-[1.15em] tracking-[-0.02em] text-[#57B083] opacity-80"
                    >
                        04
                    </div>

                    <div className="absolute left-[24%] top-[66%] w-[46%]">
                        <SuccessStories />
                    </div>

                    <div
                        className="absolute left-[48.8%] top-[95.1%] font-serif text-[44px] font-bold 
                       leading-[1.15em] tracking-[-0.02em] text-[#57B083] opacity-80"
                    >
                        05
                    </div>

                    <div className="absolute left-[45%] -bottom-[4%] w-[64%]">
                        <VisionSection />
                    </div>
                </div>
            </div>
        </section>
    );
}
