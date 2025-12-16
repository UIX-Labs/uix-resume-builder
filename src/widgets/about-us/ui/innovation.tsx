import CountUp from '@shared/ui/count-up';
import getCurrentStatsQuery from '@widgets/landing-page/api/query';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { LOGOS, ICONS } from '@shared/lib/image-assets';

// Services data array
const services = [
	{
		id: 1,
		title: 'Practical and clean resume templates',
		icon: ICONS.EXPERIENCE,
	},
	{
		id: 2,
		title: 'AI Builder intelligence for corrections',
		icon: ICONS.EXPERIENCE,
	},
	{
		id: 3,
		title: 'Tailored resume for the Job',
		icon: ICONS.EXPERIENCE,
	},
	{
		id: 4,
		title: 'Community support for resume review and mentorship',
		icon: ICONS.EXPERIENCE,
	},
];

// Company logos data array
const companyLogos = [
	{ id: 1, src: LOGOS.META, alt: 'Meta' },
	{ id: 2, src: LOGOS.GOOGLE_COLORED, alt: 'Google' },
	{ id: 3, src: LOGOS.APPLE, alt: 'Apple' },
	{ id: 4, src: LOGOS.LINKEDIN, alt: 'LinkedIn' },
	{ id: 5, src: LOGOS.AMAZON, alt: 'Amazon' },
];

function Innovation() {
	const { data: currentStats } = getCurrentStatsQuery();
	// Calculate minimum width for count based on target number to prevent layout shift
	const countMinWidth = useMemo(() => {
		const targetNumber = currentStats?.totalUsers ?? 0;
		const formatted = new Intl.NumberFormat('en-US').format(targetNumber);
		// Use character width units (ch) for precise control - each ch is roughly the width of "0"
		// Use max of formatted length or initial value (10) to ensure smooth transition
		const maxChars = Math.max(formatted.length, '10'.length);
		// Use ch units for tighter, more accurate spacing (add 0.5ch for slight padding)
		return `${maxChars + 0.5}ch`;
	}, [currentStats?.totalUsers]);

	return (
		<div className="w-full max-w-[1408px] min-h-[600px] lg:h-[793px] rounded-[20px] md:rounded-[36px] relative overflow-hidden mx-auto bg-[#171717] px-4 sm:px-6 md:px-8 lg:px-19.5 py-8 md:py-[58px]">
			{/* Left gradient - reduced visibility on mobile */}
			<div className="absolute pointer-events-none left-[-176px] top-[532px] w-[300px] md:w-[604px] h-[300px] md:h-[604px] bg-[linear-gradient(139deg,rgba(255,176,138,0.5)_23%,rgba(233,59,54,0.4)_40%,rgba(23,23,23,1)_67%)] md:bg-[linear-gradient(139deg,rgba(255,176,138,1)_23%,rgba(233,59,54,1)_40%,rgba(23,23,23,1)_67%)] blur-[60px] md:blur-[100px]" />

			{/* Right gradient - reduced visibility on mobile to prevent content hiding */}
			<div className="absolute pointer-events-none right-[-200px] md:right-[-380px] top-[-100px] md:top-[-203px] w-[300px] md:w-[604px] h-[300px] md:h-[604px] bg-[linear-gradient(136deg,rgba(37,122,255,0.3)_30%,rgba(23,23,23,1)_66%)] md:bg-[linear-gradient(136deg,rgba(37,122,255,1)_30%,rgba(23,23,23,1)_66%)] blur-[40px] md:blur-[60px] z-0" />

			<div className="flex flex-col h-full relative z-10">
				{/* Top Section - Don't forget */}
				<div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 md:mb-[41px]">
					<div className="w-12 sm:w-20 md:w-28 h-[1px] bg-gradient-to-r from-transparent to-white/33" />
					<span className="text-white font-semibold whitespace-nowrap font-[Geist,sans-serif] text-sm sm:text-base md:text-[18px] leading-[1.33em] tracking-[-0.0144em]">
						Don't forget
					</span>
					<div className="w-12 sm:w-20 md:w-28 h-[1px] bg-gradient-to-l from-transparent to-white/33" />
				</div>

				{/* Middle Section - Two Column Layout */}
				<div className="flex flex-col lg:flex-row flex-1 gap-8 lg:gap-[197px]">
					{/* Left Column - Title and Ratings */}
					<div className="flex flex-col w-full lg:w-[652px]">
						{/* Title Section */}
						<h2 className="text-[#F0F7FF] font-normal mb-6 md:mb-[53px] font-[Geist,sans-serif] text-[28px] sm:text-[36px] md:text-[45px] lg:text-[55.42px] leading-[1.2em] tracking-[-0.03em] text-center lg:text-left">
							Services that
							<br />
							<span className="font-geist text-[36px] sm:text-[48px] md:text-[60px] lg:text-[80px] font-semibold leading-[120%] tracking-[-2.4px]">
								Supercharge Your
								<br />
								Career
							</span>
						</h2>

						{/* Rating Section */}
						<div className="flex items-center gap-4 justify-center lg:justify-start">
							{/* User avatars */}
							<div className="flex items-center -space-x-3">
								<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E5B89C] border-2 border-white" />
								<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#C4A48B] border-2 border-white" />
								<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#B8957A] border-2 border-white" />
							</div>

							{/* Stars and text */}
							<div className="flex flex-col">
								<div className="flex items-center gap-1">
									{[...Array(5)].map((_, i) => (
										<Image
											src={ICONS.STAR}
											width={18}
											height={18}
											alt=""
											key={i}
											className="w-4 h-4 md:w-[23px] md:h-[23px]"
										/>
									))}
								</div>
								<p className="text-[#F1F7FF] font-semibold mt-1 font-[Geist,sans-serif] text-sm md:text-[18px] leading-[1.33em] tracking-[-0.0144em]">
									<span
										className="inline-block tabular-nums"
										style={{ minWidth: countMinWidth, textAlign: 'center' }}
									>
										<CountUp
											from={10}
											to={currentStats?.totalUsers ?? 0}
											separator=","
											duration={1}
											className="count-up-text"
											onStart={undefined}
											onEnd={undefined}
										/>
										+
									</span>{' '}
									Happy Users
								</p>
							</div>
						</div>
					</div>

					{/* Right Column - Services List */}
					<div className="flex flex-col justify-center gap-4 md:gap-[43px] w-full lg:w-[355px]">
						{services.map((service) => (
							<div
								key={service.id}
								className="flex items-start gap-3 md:gap-[16.75px]"
							>
								<div className="w-[36px] h-[36px] md:w-[44.95px] md:h-[44.95px] rounded-full flex-shrink-0">
									<Image
										src={service.icon}
										alt={service.title}
										width={45}
										height={45}
										className="rounded-full mt-1 md:mt-2 w-[36px] h-[36px] md:w-[45px] md:h-[45px]"
										unoptimized
									/>
								</div>
								<span className="text-white font-normal font-[Geist,sans-serif] text-base sm:text-lg md:text-xl lg:text-[29.32px] leading-[1.43em] tracking-[-0.0036em] z-10">
									{service.title}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="flex flex-col items-center gap-4 md:gap-9 mt-8 lg:mt-auto">
					<div className="flex items-center gap-2 sm:gap-3 w-full justify-center">
						<div className="flex-1 max-w-[100px] sm:max-w-none h-[1px] bg-gradient-to-r from-transparent to-white/33" />
						<span className="text-white font-semibold whitespace-nowrap font-[Geist,sans-serif] text-xs sm:text-sm md:text-[18px] leading-[1.33em] tracking-[-0.0144em] text-center">
							Where Our Users Got Hired
						</span>
						<div className="flex-1 max-w-[100px] sm:max-w-none h-[1px] bg-gradient-to-l from-transparent to-white/33" />
					</div>

					{/* Company Logos */}
					<div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-[38.94px] flex-wrap">
						{companyLogos.map((logo) => (
							<Image
								key={logo.id}
								src={logo.src}
								alt={logo.alt}
								width={59}
								height={59}
								className="w-8 h-8 sm:w-10 sm:h-10 md:w-[59px] md:h-[59px]"
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Innovation;
