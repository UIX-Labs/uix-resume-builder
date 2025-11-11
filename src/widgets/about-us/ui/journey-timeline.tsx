"use client"
import { WhyWeStarted } from '@features/resume-journey/why-we-started';
import { HumanAiApproach } from '@features/resume-journey/human-ai-approach';
import { TheCommunity } from '@features/resume-journey/the-community';
import { SuccessStories } from '@features/resume-journey/success-stories';
import { VisionSection } from '@features/resume-journey/vision-section';
import { useEffect, useRef, useState } from 'react';

export function JourneyTimeline() {
  const threadPathRefs = useRef([]);
  const circleRefs = useRef([]);
  const sectionRefs = useRef([]);
  const timelineContainerRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    // Get total path lengths for each green path
    const pathLengths = threadPathRefs.current.map((path) => {
      if (path) {
        const length = path.getTotalLength();
        // Set initial state - hidden
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        return length;
      }
      return 0;
    });

    // Calculate cumulative path lengths for sequential animation
    const totalLength = pathLengths.reduce((sum, length) => sum + length, 0);
    const cumulativeLengths = pathLengths.reduce((acc, length, index) => {
      const prevTotal = index === 0 ? 0 : acc[index - 1];
      acc.push(prevTotal + length);
      return acc;
    }, []);

    const updateThread = () => {
      if (!timelineContainerRef.current) return;

      // Get timeline container's position (the visual timeline, not the section)
      const rect = timelineContainerRef.current.getBoundingClientRect();
      const timelineTop = rect.top;
      const timelineHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through the timeline
      // Start when top of timeline reaches center of viewport
      // End when bottom of timeline reaches center of viewport
      const viewportCenter = windowHeight / 2;
      const timelineStart = timelineTop + timelineHeight * 0.1; // Start at 10% into timeline
      const timelineEnd = timelineTop + timelineHeight * 0.9; // End at 90% through timeline
      const scrollProgress = (viewportCenter - timelineStart) / (timelineEnd - timelineStart);
      const scrollPercentage = Math.max(0, Math.min(scrollProgress, 1));

      // Calculate how much of the total thread should be drawn
      const drawTotal = totalLength * scrollPercentage;

      // Animate each path sequentially based on cumulative progress
      threadPathRefs.current.forEach((path, index) => {
        if (path && pathLengths[index]) {
          const pathStart = index === 0 ? 0 : cumulativeLengths[index - 1];
          const pathEnd = cumulativeLengths[index];

          // Calculate how much of this specific path should be drawn
          const pathProgress = Math.max(0, Math.min(drawTotal - pathStart, pathLengths[index]));

          path.style.strokeDashoffset = pathLengths[index] - pathProgress;
        }
      });

      // Animate circles based on their position in the thread
      circleRefs.current.forEach((circle, index) => {
        if (circle) {
          // Show circle when the thread reaches its position
          // Circles appear at different points along the thread
          const circleThreshold = index / Math.max(1, circleRefs.current.length - 1);
          if (scrollPercentage >= circleThreshold * 0.95) {
            circle.style.opacity = '1';
          } else {
            circle.style.opacity = '0';
          }
        }
      });
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
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <section className="w-full py-16 md:py-24">
      {/* Introductory Text Section */}
      {/* <div className="w-full max-w-[1272px] mx-auto px-4 mb-12"> */}
      <div className="max-w-[540px] ml-auto mr-[17%] mb-6">
        <p
          className="text-[18px] text-[#0C1118]"
          style={{
            fontFamily: 'Geist, sans-serif',
          }}
        >
          Most people don't open a resume builder in a happy mood. They're stressed, uncertain, and looking for a way
          out — not just better grammar or keywords.
        </p>
        <p className="text-[18px] text-[#0C1118]">That's where we saw the gap no one was solving.</p>
      </div>
      {/* </div> */}

      <div className="w-full max-w-[1272px]">
        <div ref={timelineContainerRef} className="relative w-full aspect-[1272.05/1961.41]">
          {/* Background curved line SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="1275" height="1964" viewBox="0 0 1275 1964" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="863.271" cy="29.5" r="6.5" fill="#D1D5DB" />
              <circle cx="1004.27" cy="308.5" r="6.5" fill="#D1D5DB" />
              <path d="M866.771 465.5C721.771 497 473.171 463.7 438.771 614.5" stroke="#D1D5DB" strokeWidth="4" />
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
              <circle cx="601.271" cy="1018.5" r="6.5" fill="#D1D5DB" />
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
              <circle cx="600.271" cy="1885.5" r="6.5" fill="#D1D5DB" />
              <path d="M594.771 1887C498.604 1921 245.871 1985.6 0.270996 1952" stroke="#D1D5DB" strokeWidth="4" />
              <circle cx="1109.27" cy="1421.5" r="6.5" fill="#D1D5DB" />
              <circle cx="438.271" cy="619.5" r="6.5" fill="#D1D5DB" />
            </svg>

            {/* Animated Green Thread */}
            <svg
              width="1275"
              height="1964"
              viewBox="0 0 1275 1964"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0"
            >
              <circle
                ref={(el) => (circleRefs.current[0] = el)}
                cx="863.271"
                cy="29.5"
                r="6.5"
                fill="#309F66"
                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
              />
              <circle
                ref={(el) => (circleRefs.current[1] = el)}
                cx="1004.27"
                cy="308.5"
                r="6.5"
                fill="#309F66"
                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
              />
              <path
                ref={(el) => (threadPathRefs.current[0] = el)}
                d="M866.771 465.5C721.771 497 473.171 463.7 438.771 614.5"
                stroke="#309F66"
                strokeWidth="4"
              />
              <path
                ref={(el) => (threadPathRefs.current[1] = el)}
                d="M863.271 36C860.438 72.6667 882.471 152 993.271 176C1131.77 206 1249.77 160.5 1265.27 129C1280.77 97.5 1272.27 65 1224.27 50.5C1176.27 36 1002.77 51 1008.77 226.5C1014.77 402 923.771 451.5 863.271 466"
                stroke="#309F66"
                strokeWidth="4"
              />
              <path
                ref={(el) => (threadPathRefs.current[2] = el)}
                d="M438.271 625C437.771 663.333 428.471 700.2 319.271 741C182.771 792 214.044 934.826 262.771 972C311.271 1009 441.772 1065.23 505.271 922C550.271 820.5 674.271 892 603.271 1013"
                stroke="#309F66"
                strokeWidth="4"
              />
              <circle
                ref={(el) => (circleRefs.current[2] = el)}
                cx="601.271"
                cy="1018.5"
                r="6.5"
                fill="#309F66"
                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
              />
              <path
                ref={(el) => (threadPathRefs.current[3] = el)}
                d="M597.771 1023.5C563.437 1075.33 547.771 1191.9 753.771 1239.5C1011.27 1299 1035.77 1355.5 966.771 1377.5C897.771 1399.5 853.771 1306.5 1008.77 1313.5C1132.77 1319.1 1127.27 1383.67 1110.77 1416"
                stroke="#309F66"
                strokeWidth="4"
              />
              <path
                ref={(el) => (threadPathRefs.current[4] = el)}
                d="M1107.27 1426.5C1091.44 1468.67 1020.17 1579 863.771 1679C668.271 1804 597.771 1767 574.771 1744C516.771 1689.5 679.271 1650 716.271 1703.5C753.271 1757 651.771 1860.5 603.271 1882.5"
                stroke="#309F66"
                strokeWidth="4"
              />
              <circle
                ref={(el) => (circleRefs.current[3] = el)}
                cx="600.271"
                cy="1885.5"
                r="6.5"
                fill="#309F66"
                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
              />
              <path
                ref={(el) => (threadPathRefs.current[5] = el)}
                d="M594.771 1887C498.604 1921 245.871 1985.6 0.270996 1952"
                stroke="#309F66"
                strokeWidth="4"
              />
              <circle
                ref={(el) => (circleRefs.current[4] = el)}
                cx="1109.27"
                cy="1421.5"
                r="6.5"
                fill="#309F66"
                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
              />
              <circle
                ref={(el) => (circleRefs.current[5] = el)}
                cx="438.271"
                cy="619.5"
                r="6.5"
                fill="#309F66"
                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
              />
            </svg>
          </div>

          {/* Labels and Numbers */}
          <div
            className="absolute left-[69.3%] top-[0%] font-serif text-[44px] font-bold 
                       leading-[1.15em] tracking-[-0.02em] text-[#309F66] opacity-80"
          >
            problem
          </div>

          {/* Section 01 - Why We Started */}
          <div
            className="absolute left-[80.4%] top-[14.6%] font-serif text-[44px] font-bold 
                       leading-[1.15em] tracking-[-0.02em] text-[#309F66] opacity-80"
          >
            01
          </div>

          <div className="absolute left-[18%] top-[8%] w-[42%]">
            <WhyWeStarted />
          </div>

          {/* Section 02 - The Human + AI Approach */}
          <div
            className="absolute left-[36%] top-[30.4%] font-serif text-[44px] font-bold 
                       leading-[1.15em] tracking-[-0.02em] text-[#57B083] opacity-80"
          >
            02
          </div>

          <div className="absolute left-[57%] top-[33%] w-[53%]">
            <HumanAiApproach />
          </div>

          {/* Section 03 - The Community */}
          <div
            className="absolute left-[48.8%] top-[50.8%] font-serif text-[44px] font-bold 
                       leading-[1.15em] tracking-[-0.02em] text-[#57B083] opacity-80"
          >
            03
          </div>

          <div className="absolute left-[65%] top-[48%] w-[44%]">
            <TheCommunity />
          </div>

          {/* Section 04 - Success Stories */}
          <div
            className="absolute left-[88.7%] top-[71.3%] font-serif text-[44px] font-bold 
                       leading-[1.15em] tracking-[-0.02em] text-[#57B083] opacity-80"
          >
            04
          </div>

          <div className="absolute left-[24%] top-[66%] w-[46%]">
            <SuccessStories />
          </div>

          {/* Section 05 - Our Vision */}
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