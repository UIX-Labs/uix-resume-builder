'use client';

import Spotlight from '@shared/icons/spotlight';
import { cn } from '@shared/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { UploadIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { fetch } from '@shared/api';
import { RoastLoading } from './components/roast-loading';
import { TypewriterRoast } from './components/typewriter-roast';
import Fire from './components/fire';
import Header from '@widgets/landing-page/ui/header-section';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';

interface FireBackdropProps {
	variant: 'fixed' | 'flow';
}

function FireBackdrop({ variant }: FireBackdropProps) {
	const containerClass =
		variant === 'fixed'
			? 'pointer-events-none select-none fixed inset-x-0 bottom-0 -z-10'
			: 'pointer-events-none select-none relative w-full mt-10 md:mt-12 lg:mt-16';

	const wrapperClass =
		variant === 'fixed'
			? 'relative w-full h-[240px] md:h-[320px] lg:h-[480px]'
			: 'relative w-full h-[240px] md:h-[320px] lg:h-[480px] -z-10';

	return (
		<div
			aria-hidden
			className={containerClass}
		>
			<div className={wrapperClass}>
				<Image
					src="/images/template-1.svg"
					alt="Resume Template 1"
					width={300}
					height={400}
					className="absolute top-[30%] left-[5%] md:left-[10%] w-[100px] md:w-[300px] opacity-70 rotate-[15deg] z-0"
				/>
				<Image
					src="/images/template-2.svg"
					alt="Resume Template 2"
					width={300}
					height={400}
					className="absolute top-[30%] right-[25%] md:right-[30%] w-[100px] md:w-[300px] opacity-70 rotate-[-15deg] z-0"
				/>
				<Image
					src="/images/template-3.svg"
					alt="Resume Template 3"
					width={280}
					height={350}
					className="absolute top-[35%] left-[25%] md:left-[70%] w-[100px] md:w-[280px] opacity-70 rotate-[5deg] z-0"
				/>

				<Fire className="w-full scale-x-110" />
			</div>
		</div>
	);
}

export default function RoastPage() {
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [response, setResponse] = useState<string | null>(null);

	const roastResume = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append('file', file);

			const response = await fetch<{ roast: string }>('resume/roast', {
				options: {
					method: 'POST',
					body: formData,
				},
			});
			return response;
		} catch (error) {
			console.error('Error roasting resume:', error);
			throw new Error('Failed to roast resume');
		}
	};

	const { mutate: roastResumeMutation, isPending } = useMutation({
		mutationFn: roastResume,
		onSuccess: (data) => {
			toast.success('Resume roasted successfully');
			setResponse(data.roast);
			trackEvent('roast_resume_success', {
				timestamp: new Date().toISOString(),
			});
		},
		onError: () => {
			toast.error('Failed to roast resume');
		},
	});
	const shouldHideOverflow = !response || isPending;
	const isFireFixed = !response || isPending;

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	function handleFileUpload(file: File) {
		roastResumeMutation(file);
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files?.[0];

		if (file) {
			handleFileUpload(file);
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			handleFileUpload(file);
		}
	};

	const onUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleUploadKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onUploadClick();
		}
	};

	return (
		<div
			className={cn(
				'relative min-h-screen bg-white w-full font-sans',
				shouldHideOverflow && 'overflow-hidden'
			)}
		>
			<div
				className={cn(
					'absolute inset-0',
					'[background-size:20px_20px]',
					'[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
					'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]'
				)}
			/>

			<Spotlight className="absolute inset-0" />

			<main className="relative z-10 w-full min-h-screen flex flex-col">
				<Header />
				<div className="flex flex-col items-center w-full pt-12 pb-8 md:pt-16 md:pb-12 lg:pt-8 lg:pb-4 px-5 flex-1">
					<div className="flex items-center gap-1 px-2 py-1 bg-[#02A44F] text-white rounded-full text-xs font-bold mb-4 lg:mb-2">
						<span>AI Powered</span>

						<Image
							src="/images/auto_awesome.svg"
							alt="AI"
							width={14}
							height={14}
							className="inline-block"
						/>
					</div>

					<h1 className="text-2xl lg:text-[32px] font-bold mb-3 lg:mb-2 leading-tight w-full md:w-1/2 text-center text-[#005FF2]">
						🔥 Resume Roast 🔥
						<br />
						<span className="block -mt-2 lg:-mt-1 mx-auto rounded-full text-[#364153] font-medium backdrop-blur-xs bg-[#E3E3E3]/12 border border-white shadow-lg text-sm lg:text-base py-1.5 lg:py-1 px-4 w-full">
							Get your resume roasted (in a good way!) and discover what's
							holding you back from landing your dream job
						</span>
					</h1>

					{isPending ? (
						<div className="w-full md:w-1/2 mt-6 lg:mt-3">
							<RoastLoading />
						</div>
					) : response ? (
						<div className="w-full md:w-1/2 mt-6 lg:mt-3 mb-8 lg:mb-4">
							<TypewriterRoast
								content={response || ''}
								onRoastAnother={() => setResponse(null)}
							/>
						</div>
					) : (
						<>
							<div
								className={cn(
									'bg-white/40 border-2 border-[#d1d5dc] border-dashed rounded-[16px] px-6 py-8 lg:px-[32px] lg:py-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center transition-colors cursor-pointer mt-6 lg:mt-3 w-full md:w-1/2',
									isDragging
										? 'border-[#005ff2] bg-blue-50/50'
										: 'hover:bg-white/60'
								)}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
								onClick={onUploadClick}
								onKeyDown={handleUploadKeyDown}
								role="button"
								tabIndex={0}
							>
								<input
									type="file"
									ref={fileInputRef}
									onChange={handleFileSelect}
									className="hidden"
									accept=".pdf"
								/>

								<div className="bg-[#ebf3ff] w-12 h-12 lg:w-11 lg:h-11 rounded-full flex items-center justify-center mb-4 lg:mb-2">
									<div className="relative w-6 h-6 lg:w-5 lg:h-5">
										<UploadIcon className="w-6 h-6 lg:w-5 lg:h-5" />
									</div>
								</div>

								<h2 className="text-[#101828] text-[18px] lg:text-[16px] font-semibold mb-1.5 lg:mb-1">
									Upload Your Resume
								</h2>
								<p className="text-gray-500 text-sm mb-3 lg:mb-2">
									Drag and drop your PDF here
								</p>
							</div>

							<p className="text-center text-sm text-[#4A5565] mt-3 lg:mt-2">
								Don't have a resume yet?&nbsp;
								<Link
									href="/dashboard"
									className="text-[#005FF2] underline decoration-solid"
								>
									Create one with PikaResume
								</Link>
							</p>
						</>
					)}
				</div>

				<FireBackdrop variant={isFireFixed ? 'fixed' : 'flow'} />
			</main>
		</div>
	);
}
