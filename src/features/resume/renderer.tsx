/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: needed for rich text content */
import dayjs from 'dayjs';
import { cn } from '@shared/lib/cn';
import { useLayoutEffect, useRef, useState } from 'react';
import React from 'react';
import * as LucideIcons from 'lucide-react';

// Utility to resolve data paths
function resolvePath(data: any, path: string, fallback?: any): any {
	if (!path) return fallback;

	const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
	let result = data;

	for (const key of keys) {
		if (result === null || result === undefined) return fallback;
		result = result[key];
	}

	return result ?? fallback;
}

type RenderProps = {
	template: any;
	data: any;
	className?: string;
};

export function ResumeRenderer({ template, data, className }: RenderProps) {
	const [pages, setPages] = useState<React.ReactNode[][]>([]);
	const dummyContentRef = useRef<HTMLDivElement>(null);

	const { page } = template;
	const sections = template.sections || [];

	const PAGE_HEIGHT = 1122;
	const PAGE_PADDING = page.padding ?? 24;
	const MAX_HEIGHT = PAGE_HEIGHT - PAGE_PADDING * 2;

	// Paginate content
	useLayoutEffect(() => {
		const container = dummyContentRef.current;
		if (!container) return;

		const newPages: React.ReactNode[][] = [];
		let currentPage: React.ReactNode[] = [];
		newPages.push(currentPage);

		const containerTop = container.getBoundingClientRect().top;
		let currentPageTop = containerTop;

		function helper(container: HTMLElement) {
			const children = Array.from(container.children) as HTMLElement[];

			if (children.length === 0) {
				return;
			}

			for (let i = 0; i < children.length; i++) {
				const el = children[i];
				el.style.display = '';

				const elRect = el.getBoundingClientRect();
				const elTop = elRect.top;
				const elBottom = elRect.bottom;
				const canBreak = el.getAttribute('data-canbreak') === 'true';

				if (canBreak) {
					helper(el);
				} else {
					// Check if element would exceed max height from current page start
					if (
						elBottom - currentPageTop > MAX_HEIGHT &&
						currentPage.length > 0
					) {
						currentPage = [];
						newPages.push(currentPage);
						currentPageTop = elTop; // New page starts at this element's top
					}

					currentPage.push(el.cloneNode(true) as unknown as React.ReactNode);
				}
			}
		}

		helper(container);

		setPages(newPages);
	}, [template, data]);

	return (
		<>
			<div
				ref={dummyContentRef}
				className="bg-white border-[3px] border-blue-800 outline-[3px] outline-blue-400 rounded-[18px] mb-5"
				style={{
					position: 'absolute',
					visibility: 'hidden',
					fontFamily: page.fontFamily,
					pointerEvents: 'none',
					width: '21cm',
					padding: PAGE_PADDING,
				}}
			>
				{sections.map((section: any, idx: number) => (
					<React.Fragment key={idx}>
						{renderSection(section, data)}
					</React.Fragment>
				))}
			</div>

			{pages.map((blocks, index) => (
				<div
					key={index}
					className={cn(
						'bg-white border-[3px] border-blue-800 outline-[3px] outline-blue-400 rounded-[18px] mb-5',
						page.className,
						className
					)}
					style={{
						padding: PAGE_PADDING,
						background: page.background ?? 'white',
						fontFamily: page.fontFamily,
						width: '21cm',
						height: '29.7cm',
					}}
				>
					{blocks.map((node, i) => (
						<div
							key={i}
							dangerouslySetInnerHTML={{ __html: (node as any).outerHTML }}
							className='h-full'
						/>
					))}
				</div>
			))}
		</>
	);
}

// Main section renderer
function renderSection(section: any, data: any): React.ReactNode {
	if (section.type === 'header') return renderHeaderSection(section, data);
	if (section.type === 'list-section') return renderListSection(section, data);
	if (section.type === 'two-column-layout')
		return renderTwoColumnLayout(section, data);
	if (section.type === 'content-section')
		return renderContentSection(section, data);
	if (section.type === 'inline-list-section')
		return renderInlineListSection(section, data);
	if (section.type === 'badge-section')
		return renderBadgeSection(section, data);
	if (section.type === 'container-wrapper')
		return renderContainerWrapper(section, data);
	return null;
}

// Container wrapper renderer - wraps multiple sections with a className
function renderContainerWrapper(section: any, data: any): React.ReactNode {
	const { sections, className } = section;

	return (
		<div
			className={cn(className)}
			data-item="container-wrapper"
			data-canbreak="true"
		>
			{sections?.map((subSection: any, idx: number) => (
				<React.Fragment key={idx}>
					{renderSection(subSection, data)}
				</React.Fragment>
			))}
		</div>
	);
}

// Render divider (horizontal line under headings)
function renderDivider(divider: any): React.ReactNode {
	if (!divider) return null;

	if (divider.variant === 'line') {
		return (
			<div
				data-item="divider"
				className={cn('w-full bg-zinc-200 h-px', divider.className)}
			/>
		);
	}
	if (divider.variant === 'pipe') {
		return (
			<span
				data-item="divider"
				className={divider.className}
			>
				|
			</span>
		);
	}
	return null;
}

// Header section renderer
function renderHeaderSection(section: any, data: any): React.ReactNode {
	const { fields, className, style } = section;

	return (
		<div
			className={cn(className)}
			style={style}
		>
			{fields.nameTitle ? (
				<div className={fields.nameTitle.className}>
					{fields.name && (
						<p className={fields.name.className}>
							{resolvePath(data, fields.name.path, fields.name.fallback)}
						</p>
					)}
					{fields.title && fields.title.path && (
						<p className={fields.title.className}>
							{resolvePath(data, fields.title.path)}
						</p>
					)}
				</div>
			) : (
				<>
					{fields.name && (
						<p className={fields.name.className}>
							{resolvePath(data, fields.name.path, fields.name.fallback)}
						</p>
					)}
					{fields.title && fields.title.path && (
						<p className={fields.title.className}>
							{resolvePath(data, fields.title.path)}
						</p>
					)}
				</>
			)}

			{fields.contact && fields.contact.type === 'contact-grid' && (
				<div className={fields.contact.className}>
					{fields.contact.items.map((item: any, idx: number) => {
						if (item.type === 'inline-group-with-icon') {
							return (
								<div
									key={idx}
									className={item.className}
								>
									{item.items.map((subItem: any, subIdx: number) => (
										<React.Fragment key={subIdx}>
											{renderField(subItem, data)}
										</React.Fragment>
									))}
								</div>
							);
						}
						return (
							<div
								key={idx}
								className={item.className}
							>
								{renderField(item, data)}
							</div>
						);
					})}
				</div>
			)}

			{/* Handle inline-group contact structure */}
			{fields.contact && fields.contact.type === 'inline-group' && (
				<>{renderField(fields.contact, data)}</>
			)}

			{/* Handle legacy contact structure */}
			{fields.contact && !fields.contact.type && (
				<div className={fields.contact.className}>
					{fields.contact.items.map((item: any, idx: number) => {
						const value = resolvePath(data, item.path, item.fallback);
						if (!value) return null;

						const showSeparator = idx > 0 && fields.contact.separator;

						if (item.type === 'link') {
							const href = item.href.startsWith('mailto:')
								? item.href.replace('{{value}}', value)
								: resolvePath(data, item.href);

							return (
								<span key={idx}>
									{showSeparator && fields.contact.separator}
									<a
										href={href}
										className={item.className}
									>
										{value}
									</a>
								</span>
							);
						}

						return (
							<span key={idx}>
								{showSeparator && fields.contact.separator}
								{value}
							</span>
						);
					})}
				</div>
			)}
		</div>
	);
}

// List section renderer (education, experience, projects, certifications)
function renderListSection(section: any, data: any): React.ReactNode {
	const items = resolvePath(data, section.listPath, []);

	if (!Array.isArray(items) || items.length === 0) return null;

	const canBreak = section.break !== false; // Default to true if not specified

	// Check if this is a two-column layout (heading on left, content on right)
	const isTwoColumnLayout =
		section.className && section.className.includes('justify-between');

	if (isTwoColumnLayout) {
		return (
			<div
				data-item="list-section"
				className={cn(section.className)}
			>
				{/* Left column: Heading */}
				<div className={cn('flex-shrink-0', section.heading.className)}>
					{section.heading && (
						<p data-item="heading">
							{resolvePath(
								data,
								section.heading.path,
								section.heading.fallback
							)}
						</p>
					)}
				</div>

				{/* Right column: Content */}
				<div
					data-item="content"
					className={cn('flex-1', section.containerClassName)}
				>
					{items.map((item: any, idx: number) => (
						<div
							key={idx}
							className={section.itemTemplate.className}
						>
							{section.itemTemplate.rows
								? renderItemWithRows(section.itemTemplate, item)
								: renderItemWithFields(section.itemTemplate, item)}
						</div>
					))}
				</div>
			</div>
		);
	}

	// Default vertical layout
	return (
		<div
			data-item="list-section"
			data-canbreak={canBreak}
			className={cn(section.className)}
		>
			<div className={cn('flex flex-col', section.heading.className)}>
				{section.heading && (
					<p data-item="heading">
						{resolvePath(data, section.heading.path, section.heading.fallback)}
					</p>
				)}

				{section.heading.divider && renderDivider(section.heading.divider)}
			</div>

			<div
				data-item="content"
				data-canbreak={canBreak}
				className={section.containerClassName}
			>
				{items.map((item: any, idx: number) => (
					<div
						key={idx}
						className={section.itemTemplate.className}
					>
						{section.itemTemplate.rows
							? renderItemWithRows(section.itemTemplate, item)
							: renderItemWithFields(section.itemTemplate, item)}
					</div>
				))}
			</div>
		</div>
	);
}

// Two-column layout renderer
function renderTwoColumnLayout(section: any, data: any): React.ReactNode {
	const { leftColumn, rightColumn, className } = section;

	return (
		<div
			className={cn(className)}
			data-item="two-column-layout"
		>
			{/* Left Column */}
			{leftColumn && (
				<div className={cn(leftColumn.className)}>
					{leftColumn.sections?.map((subSection: any, idx: number) => (
						<React.Fragment key={idx}>
							{renderSection(subSection, data)}
						</React.Fragment>
					))}
				</div>
			)}

			{/* Right Column */}
			{rightColumn && (
				<div className={cn(rightColumn.className)}>
					{rightColumn.sections?.map((subSection: any, idx: number) => (
						<React.Fragment key={idx}>
							{renderSection(subSection, data)}
						</React.Fragment>
					))}
				</div>
			)}
		</div>
	);
}

function renderItemWithRows(template: any, item: any): React.ReactNode {
	return template.rows.map((row: any, rowIdx: number) => (
		<div
			key={rowIdx}
			className={row.className}
		>
			{row.cells.map((cell: any, cellIdx: number) => (
				<div
					key={cellIdx}
					className={cell.className}
				>
					{renderField(cell, item)}
				</div>
			))}
		</div>
	));
}

function renderItemWithFields(template: any, item: any): React.ReactNode {
	return template.fields.map((field: any, idx: number) => (
		<React.Fragment key={idx}>{renderField(field, item)}</React.Fragment>
	));
}

function renderField(field: any, data: any): React.ReactNode {
	// Handle container type
	if (field.type === 'container') {
		return (
			<div className={field.className}>
				{field.children?.map((child: any, idx: number) => (
					<React.Fragment key={idx}>{renderField(child, data)}</React.Fragment>
				))}
			</div>
		);
	}

	// Handle badge type
	if (field.type === 'badge') {
		const value = field.pathWithFallback
			? resolvePath(
				data,
				field.pathWithFallback.path,
				field.pathWithFallback.fallback
			)
			: resolvePath(data, field.path, field.fallback);

		const href = field.hrefPathWithFallback
			? resolvePath(
				data,
				field.hrefPathWithFallback.path,
				field.hrefPathWithFallback.fallback
			)
			: resolvePath(data, field.href);

		if (!value) return null;

		const iconElement = field.icon ? renderField(field.icon, data) : null;

		const content = (
			<span
				className={cn(
					'inline-flex items-center gap-1 rounded-full py-1 px-2',
					field.badgeClassName
				)}
			>
				{iconElement}
				{value}
			</span>
		);

		if (href) {
			return (
				<a
					href={href}
					className="hover:opacity-80"
				>
					{content}
				</a>
			);
		}

		return content;
	}

	// Handle text type with pathWithFallback
	if (field.type === 'text') {
		const value = field.pathWithFallback
			? resolvePath(
				data,
				field.pathWithFallback.path,
				field.pathWithFallback.fallback
			)
			: resolvePath(data, field.path, field.fallback);

		if (!value) return null;
		const text = `${field.prefix || ''}${value}${field.suffix || ''}`;
		return <span className={field.className}>{text}</span>;
	}

	if (field.type === 'horizontal-group') {
		return (
			<div className={cn('flex flex-row items-center', field.className)}>
				{field.items.map((subField: any, idx: number) => (
					<React.Fragment key={idx}>
						{idx > 0 && field.separator && (
							<span>{field.separator}</span>
						)}
						{renderField(subField, data)}
					</React.Fragment>
				))}
			</div>
		);
	}

	if (field.type === 'inline-group') {
		// If className contains 'flex-col', use div wrapper to respect vertical layout
		const isVertical = field.className && field.className.includes('flex-col');
		const WrapperTag = isVertical ? 'div' : React.Fragment;
		const wrapperProps = isVertical ? { className: field.className } : {};

		return (
			<WrapperTag {...wrapperProps}>
				{field.items.map((subField: any, idx: number) =>
					isVertical ? (
						<React.Fragment key={idx}>
							{renderField(subField, data)}
						</React.Fragment>
					) : (
						<span
							key={idx}
							className={field.className}
						>
							{renderField(subField, data)}
						</span>
					)
				)}
			</WrapperTag>
		);
	}

	if (field.type === 'icon') {
		const IconComponent = (LucideIcons as any)[field.name];
		if (!IconComponent) return null;
		return (
			<IconComponent
				size={field.size || 16}
				className={field.className}
			/>
		);
	}

	if (field.type === 'skillLevel') {
		const value = resolvePath(data, field.path, field.fallback);
		if (!value) return null;

		const levelMap: Record<string, number> = {
			Beginner: 2,
			Intermediate: 3,
			Expert: 5,
		};

		const circleCount = levelMap[value] || 3;

		return (
			<div className={cn('flex gap-1', field.className)}>
				{Array.from({ length: 5 }, (_, index) => (
					<div
						key={index}
						className={cn(
							'w-2 h-2 rounded-full border border-black',
							index < circleCount ? 'bg-black' : 'bg-gray-400'
						)}
					/>
				))}
			</div>
		);
	}

	if (field.type === 'inline-group-with-icon') {
		return (
			<>
				{field.items.map((subField: any, idx: number) => (
					<span key={idx}>
						{idx > 0 && field.separator}
						{renderField(subField, data)}
					</span>
				))}
			</>
		);
	}

	if (field.type === 'duration') {
		const duration = resolvePath(data, field.path, field.fallback);
		if (!duration) return null;

		if (duration.startDate && duration.endDate) {
			const start = dayjs(duration.startDate).format('MMM YYYY');
			const end = dayjs(duration.endDate).format('MMM YYYY');
			return <span className={field.className}>{`${start} - ${end}`}</span>;
		}

		if (duration.startDate && duration.ongoing) {
			const start = dayjs(duration.startDate).format('MMM YYYY');
			return <span className={field.className}>{`${start} - Present`}</span>;
		}

		return null;
	}

	if (field.type === 'html') {
		const value = resolvePath(data, field.path, field.fallback);
		if (!value) return null;
		return (
			<div
				className={field.className}
				dangerouslySetInnerHTML={{ __html: value }}
			/>
		);
	}

	if (field.type === 'link') {
		const value = field.pathWithFallback
			? resolvePath(
				data,
				field.pathWithFallback.path,
				field.pathWithFallback.fallback
			)
			: resolvePath(data, field.path, field.fallback);

		const href = field.hrefPathWithFallback
			? resolvePath(
				data,
				field.hrefPathWithFallback.path,
				field.hrefPathWithFallback.fallback
			)
			: resolvePath(data, field.href);

		if (!value || !href) return null;
		return (
			<a
				href={href}
				className={field.className}
			>
				{value}
			</a>
		);
	}

	const value = resolvePath(data, field.path, field.fallback);
	if (!value) return null;

	const text = `${field.prefix || ''}${value}${field.suffix || ''}`;
	return <span className={field.className}>{text}</span>;
}

// Content section renderer (summary)
function renderContentSection(section: any, data: any): React.ReactNode {
	const value = resolvePath(
		data,
		section.content.path,
		section.content.fallback
	);
	if (!value) return null;

	const canBreak = section.break !== false; // Default to true if not specified

	return (
		<div
			className={cn(section.className)}
			data-canbreak={canBreak}
		>
			{section.heading && (
				<p className={section.heading.className}>
					{resolvePath(data, section.heading.path, section.heading.fallback)}
				</p>
			)}

			{section.divider && renderDivider(section.divider)}

			{section.content.type === 'html' ? (
				<div
					className={section.content.className}
					dangerouslySetInnerHTML={{ __html: value }}
				/>
			) : (
				<p className={section.content.className}>{value}</p>
			)}
		</div>
	);
}

// Inline list section renderer (skills)
function renderInlineListSection(section: any, data: any): React.ReactNode {
	const items = resolvePath(data, section.listPath, []);
	if (!Array.isArray(items) || items.length === 0) return null;

	// Filter out items with no value
	const validItems = items
		.map((item: any) => resolvePath(item, section.itemPath))
		.filter((value: any) => value);

	if (validItems.length === 0) return null;

	const canBreak = section.break !== false; // Default to true if not specified

	const shouldRenderAsList = section.showBullet || (section.containerClassName.includes('grid') || section.containerClassName.includes('flex'));

	return (
		<div data-canbreak={canBreak}>
			<div className={cn('flex flex-col', section.heading.className)}>
				{section.heading && (
					<p data-item="heading">
						{resolvePath(data, section.heading.path, section.heading.fallback)}
					</p>
				)}

				{section.heading.divider && renderDivider(section.heading.divider)}
			</div>

			{shouldRenderAsList ? (
				<ul
					data-item="content"
					data-canbreak={canBreak}
					className={cn(section.containerClassName, 'list-disc list-inside')}
				>
					{validItems.map((value: any, idx: number) => (
						<li key={idx} className={section.itemClassName}>
							{value}
						</li>
					))}
				</ul>
			) : (
				<div
					data-item="content"
					data-canbreak={canBreak}
				>
					{validItems.map((value: any, idx: number) => {
						return (
							<span key={idx}>
								<span className={section.itemClassName}>{value}</span>
								{idx < items.length - 1 && section.itemSeparator && (
									<span>{section.itemSeparator}</span>
								)}
							</span>
						);
					})}
				</div>
			)}
		</div>
	);
}

/**
 * Badge section renderer (interests, achievements)
 *
 * Supports the same two-column layout pattern as list sections.
 * In two-column mode, the outer div does NOT have data-canbreak to preserve flex layout.
 * See renderListSection documentation for details.
 */
function renderBadgeSection(section: any, data: any): React.ReactNode {
	const items = resolvePath(data, section.listPath, []);
	if (!Array.isArray(items) || items.length === 0) return null;

	const canBreak = section.break !== false; // Default to true if not specified

	// Check if this is a two-column layout (heading on left, content on right)
	const isTwoColumnLayout =
		section.className && section.className.includes('justify-between');

	if (isTwoColumnLayout) {
		return (
			<div
				data-item="section"
				className={cn(section.className)}
			>
				{/* Left column: Heading */}
				<div className={cn('flex-shrink-0', section.heading.className)}>
					{section.heading && (
						<p data-item="heading">
							{resolvePath(
								data,
								section.heading.path,
								section.heading.fallback
							)}
						</p>
					)}
				</div>

				{/* Right column: Badges */}
				<div
					className={cn(
						'flex gap-1 flex-wrap flex-1',
						section.containerClassName
					)}
				>
					{items.map((item: any, idx: number) => {
						const value = section.itemPath
							? resolvePath(item, section.itemPath)
							: item;

						if (!value) {
							return null;
						}

						return (
							<span key={idx}>
								<span className={section.badgeClassName}>{value}</span>
								{idx < items.length - 1 && section.itemSeparator && (
									<span>{section.itemSeparator}</span>
								)}
							</span>
						);
					})}
				</div>
			</div>
		);
	}

	// Default vertical layout
	return (
		<div
			data-canbreak={canBreak}
			data-item="section"
			className={cn(section.className)}
		>
			<div className={cn('flex flex-col', section.heading.className)}>
				{section.heading && (
					<p data-item="heading">
						{resolvePath(data, section.heading.path, section.heading.fallback)}
					</p>
				)}

				{section.heading.divider && renderDivider(section.heading.divider)}
			</div>

			<div
				data-canbreak={canBreak}
				className={cn('flex gap-1 flex-wrap mt-2', section.containerClassName)}
			>
				{items.map((item: any, idx: number) => {
					const value = section.itemPath
						? resolvePath(item, section.itemPath)
						: item;

					if (!value) {
						return null;
					}

					return (
						<span key={idx}>
							<span className={section.badgeClassName}>{value}</span>
							{idx < items.length - 1 && section.itemSeparator && (
								<span>{section.itemSeparator}</span>
							)}
						</span>
					);
				})}
			</div>
		</div>
	);
}

// Thumbnail generation
import html2canvas from 'html2canvas';

export type ThumbnailOptions = {
	width?: number;
	height?: number;
	aspectRatio?: number;
	backgroundColor?: string;
};

export async function generateThumbnail(
	element: HTMLElement,
	options: ThumbnailOptions = {}
): Promise<string | null> {
	const { backgroundColor = 'white' } = options;

	try {
		const canvasPromise = html2canvas(element, {
			useCORS: true,
			allowTaint: false,
			backgroundColor: backgroundColor,
			logging: false,
			width: element.clientWidth,
			height: element.clientHeight,
			scale: 0.6,
		});

		const canvas = await canvasPromise;

		return canvas.toDataURL('image/png', 1);
	} catch (error) {
		console.error('Failed to generate thumbnail:', error);
		return null;
	}
}
