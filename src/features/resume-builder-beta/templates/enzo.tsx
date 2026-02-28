import type { TemplateProps } from '../types/template';
import {
  Section,
  DateRange,
  RichText,
  PageContainer,
  ProfilePicture,
  TwoColumnLayout,
  LinkItem,
} from './primitives';
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe,
  Youtube,
  Dribbble,
  Palette,
} from 'lucide-react';

export default function Enzo({ data, className }: TemplateProps) {
  const personal = data.personalDetails?.items?.[0];
  const experience = data.experience;
  const education = data.education;
  const skills = data.skills;
  const projects = data.projects;
  const certifications = data.certifications;
  const interests = data.interests;
  const achievements = data.achievements;
  const summary = data.professionalSummary?.items?.[0]?.summary;

  const linkEntries = [
    { key: 'linkedin', icon: <Linkedin size={14} className="text-neutral-800 flex-shrink-0" />, data: personal?.links?.linkedin },
    { key: 'github', icon: <Github size={14} className="text-neutral-800 flex-shrink-0" />, data: personal?.links?.github },
    { key: 'website', icon: <Globe size={14} className="text-neutral-800 flex-shrink-0" />, data: personal?.links?.website },
    { key: 'youtube', icon: <Youtube size={14} className="text-neutral-800 flex-shrink-0" />, data: personal?.links?.youtube },
    { key: 'dribble', icon: <Dribbble size={14} className="text-neutral-800 flex-shrink-0" />, data: personal?.links?.dribble },
    { key: 'behance', icon: <Palette size={14} className="text-neutral-800 flex-shrink-0" />, data: personal?.links?.behance },
  ];

  const leftColumn = (
    <div className="bg-[#E8DCC8] tracking-wide text-neutral-800 px-6 py-8 h-full">
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <ProfilePicture
          src={personal?.profilePicturePublicUrl}
          alt="Profile"
          size={128}
          className="w-32 h-32 rounded-full object-cover bg-neutral-300"
        />
      </div>

      {/* Contact */}
      <div className="mb-6">
        <span className="text-sm font-bold text-[#C9A961] tracking-wide uppercase">CONTACT</span>
        <div className="flex flex-col gap-2 mt-2">
          {personal?.phone ? (
            <div className="flex flex-row items-center gap-2">
              <Phone size={14} className="text-neutral-800 flex-shrink-0" />
              <span className="text-xs text-neutral-800 break-all">{personal.phone}</span>
            </div>
          ) : null}
          {personal?.email ? (
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-neutral-800 flex-shrink-0" />
              <a href={`mailto:${personal.email}`} className="text-xs text-neutral-800 break-all">
                {personal.email}
              </a>
            </div>
          ) : null}
          {linkEntries.map((entry) =>
            entry.data?.title ? (
              <div key={entry.key} className="flex items-center gap-2">
                {entry.icon}
                <LinkItem
                  href={entry.data.link}
                  className="text-xs text-neutral-800 break-all no-underline"
                >
                  {entry.data.title}
                </LinkItem>
              </div>
            ) : null,
          )}
        </div>
      </div>

      {/* Summary */}
      {summary ? (
        <Section
          id="summary"
          title={data.professionalSummary?.title || 'Summary'}
          visible
          className="flex flex-col pt-3 border-t border-[#C9A961]"
          titleClassName="text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1"
          divider="none"
        >
          <RichText
            html={summary}
            className="text-xs text-neutral-800 leading-relaxed break-words whitespace-pre-wrap mb-6"
          />
        </Section>
      ) : null}

      {/* Skills */}
      <Section
        id="skills"
        title={skills?.title || 'Skills'}
        visible={!!skills?.items?.length}
        className="pl-0 mb-4"
        titleClassName="text-sm font-bold text-[#C9A961] mb-1 tracking-wide uppercase pt-3 border-t border-[#C9A961]"
        divider="none"
      >
        <span className="text-xs mb-3.5 text-neutral-800 leading-relaxed">
          {skills?.items?.map((s) => s.name).join(', ')}
        </span>
      </Section>
    </div>
  );

  const rightColumn = (
    <div className="px-10 py-8 flex flex-col gap-4">
      {/* Header: Name + Title */}
      <div className="flex flex-col mb-4">
        <h1 className="text-4xl font-bold text-[#C9A961] tracking-wide uppercase">
          {personal?.fullName}
        </h1>
        {personal?.jobTitle ? (
          <p className="text-lg font-semibold text-neutral-800 tracking-wide uppercase">
            {personal.jobTitle}
          </p>
        ) : null}
      </div>

      {/* Experience */}
      <Section
        id="experience"
        title={experience?.title || 'Experience'}
        visible={!!experience?.items?.length}
        titleClassName="text-sm font-bold text-[#C9A961] tracking-wide uppercase"
        divider="none"
      >
        <div className="flex flex-col gap-3">
          {experience?.items?.map((item) => (
            <div key={item.id} className="flex flex-col gap-1" style={{ breakInside: 'avoid' }}>
              <div className="flex flex-row justify-between items-baseline gap-2 flex-wrap">
                <span className="text-sm font-bold text-neutral-900 break-words flex-1 min-w-0">
                  {item.position}
                </span>
                <span className="text-xs font-normal text-neutral-600 italic break-words">
                  {item.company}
                </span>
              </div>
              <div className="flex flex-row gap-2 items-center text-xs text-neutral-600 flex-wrap">
                <DateRange
                  startDate={item.startDate}
                  endDate={item.endDate}
                  ongoing={item.ongoing}
                  className="text-xs text-neutral-600"
                />
                {item.location ? (
                  <span className="text-xs text-neutral-600 break-words">• {item.location}</span>
                ) : null}
              </div>
              <RichText
                html={item.description}
                breakable
                className="text-xs text-neutral-700 leading-relaxed mt-2 break-words whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 [&_*]:break-words"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section
        id="education"
        title={education?.title || 'Education'}
        visible={!!education?.items?.length}
        titleClassName="text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1 mt-2"
        divider="none"
      >
        <div className="flex flex-col gap-3">
          {education?.items?.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="flex flex-row justify-between items-baseline gap-2">
                <span className="text-sm font-bold text-neutral-900 break-words flex-1 min-w-0">
                  {item.degree}
                </span>
                <DateRange
                  startDate={item.startDate}
                  endDate={item.endDate}
                  ongoing={item.ongoing}
                  className="text-xs text-neutral-600 flex-shrink-0"
                />
              </div>
              <div className="flex flex-row gap-1 items-center text-xs text-neutral-600 flex-wrap">
                <span className="text-xs text-neutral-600 break-words">{item.institution}</span>
              </div>
              {item.grade ? (
                <span className="text-xs text-neutral-700">
                  {typeof item.grade === 'string' ? item.grade : item.grade.value}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section
        id="projects"
        title={projects?.title || 'Projects'}
        visible={!!projects?.items?.length}
        titleClassName="text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1.5 mt-2"
        divider="none"
      >
        <div className="flex flex-col gap-3 mt-1">
          {projects?.items?.map((item) => (
            <div key={item.id} className="flex flex-col" style={{ breakInside: 'avoid' }}>
              <div className="flex flex-row justify-between items-baseline gap-2 flex-wrap">
                <span className="text-sm font-bold text-neutral-900 break-words flex-1 min-w-0">
                  {item.title}
                </span>
                <DateRange
                  startDate={item.startDate}
                  endDate={item.endDate}
                  ongoing={item.ongoing}
                  className="text-xs text-neutral-600"
                />
              </div>
              <RichText
                html={item.description}
                breakable
                className="text-xs text-neutral-700 leading-relaxed mt-2 break-words whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 [&_*]:break-words"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section
        id="certifications"
        title={certifications?.title || 'Certifications'}
        visible={!!certifications?.items?.length}
        titleClassName="text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1 mt-2"
        divider="none"
      >
        <div className="flex flex-col gap-3">
          {certifications?.items?.map((item) => (
            <div key={item.id} className="flex flex-col leading-none" style={{ breakInside: 'avoid' }}>
              <span className="text-sm font-bold text-neutral-900 break-words">{item.title}</span>
              <span className="text-xs text-neutral-600 break-words">{item.issuer}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Interests */}
      <Section
        id="interests"
        title={interests?.title || 'Interests'}
        visible={!!interests?.items?.length}
        className="pt-6 border-t border-[#C9A961]"
        titleClassName="text-sm font-bold text-[#C9A961] tracking-wide mb-1 mt-2 uppercase"
        divider="none"
      >
        <span className="text-xs text-neutral-800">
          {interests?.items?.map((item) =>
            typeof item === 'string' ? item : (item as any)?.items?.join(', '),
          ).join(', ')}
        </span>
      </Section>

      {/* Achievements */}
      <Section
        id="achievements"
        title={achievements?.title || 'Achievements'}
        visible={!!achievements?.items?.length}
        titleClassName="text-sm font-bold text-[#C9A961] tracking-wide uppercase mt-2 -mb-1"
        divider="none"
      >
        <div className="flex flex-col gap-0.5">
          {achievements?.items?.map((item, i) => (
            <span
              key={typeof item === 'string' ? item : i}
              className="block w-full text-xs text-neutral-800 break-words whitespace-pre-wrap leading-relaxed"
            >
              • {typeof item === 'string' ? item : (item as any)?.items?.join(', ')}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );

  return (
    <PageContainer
      pageIndex={0}
      className={className}
      padding="0px"
      background="#ffffff"
      fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    >
      <div className="text-neutral-900 leading-relaxed break-words whitespace-pre-wrap">
        <TwoColumnLayout
          left={leftColumn}
          right={rightColumn}
          leftWidth="270px"
          rightWidth="1fr"
        />
      </div>
    </PageContainer>
  );
}
