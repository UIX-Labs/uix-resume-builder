import type { TemplateProps } from '../types/template';
import {
  Section,
  DateRange,
  RichText,
  Badge,
  PageContainer,
  Divider,
  LinkItem,
} from './primitives';
import {
  Phone,
  MapPin,
  Mail,
  Linkedin,
  Github,
  Globe,
  Youtube,
  Dribbble,
  Palette,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Table row helper — reused across multiple sections
// ---------------------------------------------------------------------------
function TableRow({
  label,
  children,
  className,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ display: 'grid', gridTemplateColumns: '128px 1fr', gap: 0 }}
    >
      <div className="w-32">{label}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Badge link with icon — used in header
// ---------------------------------------------------------------------------
function BadgeLink({
  icon,
  title,
  href,
  bgClass,
  textClass,
  borderClass,
}: {
  icon: React.ReactNode;
  title?: string;
  href?: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}) {
  if (!title) return null;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${bgClass} ${textClass} border ${borderClass}`}>
      {icon}
      <LinkItem href={href} className={`text-[12px] leading-[14px] ${textClass} no-underline`}>
        {title}
      </LinkItem>
    </span>
  );
}

export default function Eren({ data, className }: TemplateProps) {
  const personal = data.personalDetails?.items?.[0];
  const experience = data.experience;
  const education = data.education;
  const skills = data.skills;
  const projects = data.projects;
  const certifications = data.certifications;
  const interests = data.interests;
  const achievements = data.achievements;
  const summaryText = data.professionalSummary?.items?.[0]?.summary;

  return (
    <PageContainer
      pageIndex={0}
      className={className}
      padding="24px"
      background="#ffffff"
      fontFamily="Inter"
    >
      <div className="text-[12px] text-slate-900 leading-[14px]">
        {/* Header with gradient background */}
        <div className="flex flex-col items-center text-center gap-1 pb-6 pt-8 mb-4 bg-no-repeat bg-cover bg-center bg-[linear-gradient(to_right,#E9D5FF,#DBEAFE,#F0F9FF)] -mt-6 -mx-6 px-6">
          <h1 className="text-[28px] font-extrabold tracking-wide text-slate-900">
            {personal?.fullName}
          </h1>
          {personal?.jobTitle ? (
            <p className="text-[12px] font-medium text-slate-600 leading-[14px] tracking-normal mt-2">
              {personal.jobTitle}
            </p>
          ) : null}

          {/* Contact line */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <div className="flex items-center gap-3 text-[12px] leading-[14px] text-black">
              {personal?.phone ? (
                <span className="flex items-center gap-1">
                  <Phone size={8} className="text-black" />
                  <span className="text-[12px] leading-[14px] text-black">{personal.phone}</span>
                </span>
              ) : null}
              {personal?.address ? (
                <span className="inline-flex items-center gap-1 max-w-[280px]">
                  <MapPin size={8} className="text-black" />
                  <span className="text-[12px] leading-[14px] text-black break-words whitespace-normal">
                    {personal.address}
                  </span>
                </span>
              ) : null}
              {personal?.email ? (
                <span className="inline-flex items-center gap-1">
                  <Mail size={8} className="text-black" />
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-[12px] leading-[14px] text-black"
                  >
                    {personal.email}
                  </a>
                </span>
              ) : null}
            </div>

            {/* Badge row */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <BadgeLink
                icon={<Linkedin size={8} className="text-blue-900" />}
                title={personal?.links?.linkedin?.title}
                href={personal?.links?.linkedin?.link}
                bgClass="bg-[#F1F8FF]"
                textClass="text-blue-900"
                borderClass="border-[#0A66C2]"
              />
              <BadgeLink
                icon={<Github size={8} className="text-gray-900" />}
                title={personal?.links?.github?.title}
                href={personal?.links?.github?.link}
                bgClass="bg-[#F2F2F2]"
                textClass="text-gray-900"
                borderClass="border-[#222222]"
              />
              <BadgeLink
                icon={<Globe size={8} className="text-gray-900" />}
                title={personal?.links?.website?.title}
                href={personal?.links?.website?.link}
                bgClass="bg-[#F5F5F5]"
                textClass="text-gray-900"
                borderClass="border-[#555555]"
              />
              <BadgeLink
                icon={<Youtube size={8} className="text-red-900" />}
                title={personal?.links?.youtube?.title}
                href={personal?.links?.youtube?.link}
                bgClass="bg-[#FFF0F0]"
                textClass="text-red-900"
                borderClass="border-[#FF0000]"
              />
              <BadgeLink
                icon={<Dribbble size={8} className="text-pink-900" />}
                title={personal?.links?.dribble?.title}
                href={personal?.links?.dribble?.link}
                bgClass="bg-[#FFF0F5]"
                textClass="text-pink-900"
                borderClass="border-[#EA4C89]"
              />
              <BadgeLink
                icon={<Palette size={8} className="text-blue-900" />}
                title={personal?.links?.behance?.title}
                href={personal?.links?.behance?.link}
                bgClass="bg-[#F0F0FF]"
                textClass="text-blue-900"
                borderClass="border-[#053EFF]"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        {summaryText ? (
          <div className="px-8 pt-6 pb-6">
            <Divider variant="line" className="border-b border-slate-200" />
            <div className="items-start px-8 pb-2.5 mt-4" style={{ display: 'grid', gridTemplateColumns: '128px 1fr' }}>
              <span className="text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase">
                {data.professionalSummary?.title || 'Summary'}
              </span>
              <RichText
                html={summaryText}
                className="text-[12px] text-slate-700 leading-[14px] break-words whitespace-pre-wrap"
              />
            </div>
          </div>
        ) : null}

        {/* Education */}
        <Section
          id="education"
          visible={!!education?.items?.length}
          className="px-8 pt-8 pb-8"
          divider="none"
        >
          <Divider variant="line" className="border-b border-slate-200 mb-2.5" />
          {education?.items?.map((item) => (
            <div
              key={item.id}
              className="items-baseline px-8 pb-2 pt-2.5"
              style={{ display: 'grid', gridTemplateColumns: '128px 1fr auto' }}
            >
              <span className="text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase">
                {education.title || 'Education'}
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-900">{item.institution}</span>
                <span className="text-slate-700">{item.degree}</span>
              </div>
              <DateRange
                startDate={item.startDate}
                endDate={item.endDate}
                ongoing={item.ongoing}
                className="text-[12px] leading-[14px] text-slate-500 whitespace-nowrap ml-auto"
              />
            </div>
          ))}
        </Section>

        {/* Experience */}
        <Section
          id="experience"
          visible={!!experience?.items?.length}
          className="px-8 pt-2 pb-6"
          divider="none"
        >
          <Divider variant="line" className="border-b border-slate-200 mb-4" />
          {experience?.items?.map((item, i) => (
            <div
              key={item.id}
              className="items-start px-8 pb-2"
              style={{ display: 'grid', gridTemplateColumns: '128px 1fr', breakInside: 'avoid' }}
            >
              {i === 0 ? (
                <span className="text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase">
                  {experience.title || 'Experience'}
                </span>
              ) : (
                <span />
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline justify-between gap-1">
                  <div className="flex flex-col gap-0.5 leading-[14px]">
                    <span className="text-[12px] leading-[14px] font-semibold text-slate-900">
                      {item.company}
                    </span>
                    <span className="text-slate-700">{item.position}</span>
                  </div>
                  <DateRange
                    startDate={item.startDate}
                    endDate={item.endDate}
                    ongoing={item.ongoing}
                    className="text-[12px] leading-[14px] text-slate-500 whitespace-nowrap ml-auto"
                  />
                </div>
                <RichText
                  html={item.description}
                  breakable
                  className="text-xs text-slate-700 leading-[14px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-0.5 break-words whitespace-pre-wrap"
                />
              </div>
            </div>
          ))}
        </Section>

        {/* Projects */}
        <Section
          id="projects"
          visible={!!projects?.items?.length}
          className="px-8 pt-6 pb-8"
          divider="none"
        >
          <Divider variant="line" className="border-b border-slate-200" />
          {projects?.items?.map((item, i) => (
            <div
              key={item.id}
              className="items-start px-8 pb-2 mt-4"
              style={{ display: 'grid', gridTemplateColumns: '128px 1fr', breakInside: 'avoid' }}
            >
              {i === 0 ? (
                <span className="text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase">
                  {projects.title || 'Projects'}
                </span>
              ) : (
                <span />
              )}
              <div className="flex-1 space-y-1.5">
                <span className="text-[12px] leading-[14px] font-semibold text-slate-900">
                  {item.title}
                </span>
                {item.techStack?.length ? (
                  <span className="text-[12px] leading-[14px] text-slate-500 italic block">
                    {Array.isArray(item.techStack) ? item.techStack.join(', ') : item.techStack}
                  </span>
                ) : null}
                <RichText
                  html={item.description}
                  breakable
                  className="text-xs text-slate-700 leading-[14px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap"
                />
                {item.link?.title ? (
                  <LinkItem
                    href={item.link.link}
                    className="text-[12px] leading-[14px] text-blue-600 hover:underline mt-1 no-underline"
                  >
                    {item.link.title}
                  </LinkItem>
                ) : null}
              </div>
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section
          id="skills"
          visible={!!skills?.items?.length}
          className="px-8 pt-6 pb-8"
          divider="none"
        >
          <Divider variant="line" className="border-b border-slate-200" />
          <div
            className="items-start px-8 pt-2 pb-4 mt-4"
            style={{ display: 'grid', gridTemplateColumns: '128px 1fr' }}
          >
            <span className="text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase">
              {skills.title || 'Skills & Tools'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {skills.items.map((skill) => (
                <Badge
                  key={skill.id}
                  className="px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-[12px] leading-[14px] text-slate-700 font-medium"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </Section>

        {/* Certifications */}
        <Section
          id="certifications"
          visible={!!certifications?.items?.length}
          className="px-8 pt-6 pb-8"
          divider="none"
        >
          <Divider variant="line" className="border-b border-slate-200" />
          {certifications?.items?.map((item, i) => (
            <div
              key={item.id}
              className="items-start px-8 pt-2.5 pb-2 mt-2"
              style={{ display: 'grid', gridTemplateColumns: '128px 1fr auto', breakInside: 'avoid' }}
            >
              {i === 0 ? (
                <span className="text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase">
                  {certifications.title || 'Certifications'}
                </span>
              ) : (
                <span />
              )}
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="text-[12px] leading-[14px] font-semibold text-slate-900 break-words whitespace-normal">
                  {item.title}
                </span>
                <span className="text-[12px] text-slate-600 leading-[14px]">{item.issuer}</span>
                {item.link?.title ? (
                  <LinkItem
                    href={item.link.link}
                    className="text-[12px] leading-[14px] text-blue-600 hover:underline no-underline"
                  >
                    {item.link.title}
                  </LinkItem>
                ) : null}
              </div>
              <DateRange
                startDate={item.startDate}
                endDate={item.endDate}
                ongoing={item.ongoing}
                className="text-[12px] leading-[14px] text-slate-500"
              />
            </div>
          ))}
        </Section>

        {/* Interests */}
        <Section
          id="interests"
          visible={!!interests?.items?.length}
          className="px-8 pt-6 pb-8"
          divider="none"
        >
          <Divider variant="line" className="border-b border-slate-200" />
          <div
            className="items-start px-8 pt-2 pb-4 mt-4"
            style={{ display: 'grid', gridTemplateColumns: '128px 1fr' }}
          >
            <span className="text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase">
              {interests.title || 'Interests'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {interests.items.map((item, i) => (
                <Badge
                  key={typeof item === 'string' ? item : i}
                  className="px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-[12px] leading-[14px] text-slate-700 font-medium"
                >
                  {typeof item === 'string' ? item : (item as any)?.items?.join(', ')}
                </Badge>
              ))}
            </div>
          </div>
        </Section>

        {/* Achievements */}
        <Section
          id="achievements"
          visible={!!achievements?.items?.length}
          className="px-8 pt-6 pb-8"
          divider="none"
        >
          <div
            className="items-start px-8 pt-2 pb-4"
            style={{ display: 'grid', gridTemplateColumns: '128px 1fr' }}
          >
            <span className="text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase">
              {achievements.title || 'Achievements'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {achievements.items.map((item, i) => (
                <Badge
                  key={typeof item === 'string' ? item : i}
                  className="px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-[12px] leading-[14px] text-slate-700 font-medium line-clamp-2 break-all"
                >
                  {typeof item === 'string' ? item : (item as any)?.items?.join(', ')}
                </Badge>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}
