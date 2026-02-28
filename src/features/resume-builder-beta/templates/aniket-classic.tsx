import type { TemplateProps } from '../types/template';
import {
  Section,
  SectionTitle,
  ItemList,
  ContactInfo,
  DateRange,
  RichText,
  Badge,
  PageContainer,
  ResumeHeader,
} from './primitives';

export default function AniketClassic({ data, className }: TemplateProps) {
  const personal = data.personalDetails?.items?.[0];
  const experience = data.experience;
  const education = data.education;
  const skills = data.skills;
  const projects = data.projects;
  const certifications = data.certifications;
  const interests = data.interests;
  const achievements = data.achievements;
  const summary = data.professionalSummary?.items?.[0]?.summary;

  return (
    <PageContainer
      pageIndex={0}
      className={className}
      fontFamily="Lora"
      background="#ffffff"
    >
      <div className="text-black leading-relaxed">
        {/* Header */}
        <ResumeHeader
          fullName={personal?.fullName}
          jobTitle={personal?.jobTitle}
          layout="centered"
          nameClassName="tracking-wide text-xl uppercase font-extrabold text-black"
          titleClassName="tracking-wide text-sm text-black"
        >
          <ContactInfo
            email={personal?.email}
            phone={personal?.phone}
            address={personal?.address}
            links={personal?.links}
            variant="inline"
            separator=" | "
            className="flex flex-row flex-wrap justify-center gap-0.5 mt-1 text-xs text-black"
          />
        </ResumeHeader>

        {/* Education */}
        <Section
          id="education"
          title={education?.title || 'Education'}
          visible={!!education?.items?.length}
          titleClassName="uppercase tracking-wide text-sm font-bold text-black mt-5 gap-1 -mb-0.5"
          divider="line"
          dividerClassName="bg-black w-full h-[1.5px] mt-0.5"
        >
          <ItemList
            items={education?.items ?? []}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <div className="flex flex-col mt-3">
                <div className="flex flex-row justify-between items-start">
                  <div className="flex flex-col leading-tight">
                    <span className="font-semibold text-sm">{item.institution}</span>
                    <span className="text-sm italic">{item.degree}</span>
                  </div>
                  <div className="flex flex-col items-end text-right leading-tight">
                    <DateRange
                      startDate={item.startDate}
                      endDate={item.endDate}
                      ongoing={item.ongoing}
                      className="italic text-xs"
                    />
                    {item.grade ? (
                      <span className="italic font-medium text-xs">
                        {typeof item.grade === 'string' ? item.grade : item.grade.value}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          />
        </Section>

        {/* Summary */}
        <Section
          id="summary"
          title={data.professionalSummary?.title || 'Summary'}
          visible={!!summary}
          className="flex flex-col mt-5"
          titleClassName="uppercase tracking-wide text-sm font-bold text-black"
          divider="line"
          dividerClassName="bg-black w-full h-[1.5px] mt-0.5"
        >
          <RichText
            html={summary}
            className="text-xs text-neutral-800 text-justify whitespace-pre-wrap mt-2.5"
          />
        </Section>

        {/* Experience */}
        <Section
          id="experience"
          title={experience?.title || 'Experience'}
          visible={!!experience?.items?.length}
          titleClassName="uppercase tracking-wide text-sm font-bold text-black gap-1 mt-2 mb-2.5"
          divider="line"
          dividerClassName="bg-black w-full h-[1.5px]"
        >
          <ItemList
            items={experience?.items ?? []}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <div className="flex flex-col mt-3" style={{ breakInside: 'avoid' }}>
                <div className="flex flex-row justify-between items-center text-sm text-black mb-1">
                  <span className="flex flex-row gap-1">
                    <span className="font-semibold">{item.position}</span>
                    {item.company ? (
                      <>
                        <span> | </span>
                        <span className="font-semibold">{item.company}</span>
                      </>
                    ) : null}
                  </span>
                  <DateRange
                    startDate={item.startDate}
                    endDate={item.endDate}
                    ongoing={item.ongoing}
                    className="italic font-normal text-xs"
                  />
                </div>
                <RichText
                  html={item.description}
                  breakable
                  className="text-xs text-neutral-800 break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap"
                />
              </div>
            )}
          />
        </Section>

        {/* Skills */}
        <Section
          id="skills"
          title={skills?.title || 'Skills'}
          visible={!!skills?.items?.length}
          titleClassName="uppercase tracking-wide text-sm font-bold text-black mt-5 gap-1 mb-2.5"
          divider="line"
          dividerClassName="bg-black w-full h-[1.5px] mt-0.5"
        >
          <span className="text-sm text-black leading-relaxed pr-2">
            {skills?.items?.map((s) => s.name).join(', ')}
          </span>
        </Section>

        {/* Projects */}
        <Section
          id="projects"
          title={projects?.title || 'Projects'}
          visible={!!projects?.items?.length}
          className="flex flex-col"
          titleClassName="uppercase tracking-wide text-sm font-bold text-black gap-1 mb-2 mt-1"
          divider="line"
          dividerClassName="bg-black w-full h-[1.5px]"
        >
          <ItemList
            items={projects?.items ?? []}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <div className="flex flex-col gap-1 mt-3" style={{ breakInside: 'avoid' }}>
                <div className="flex flex-row justify-between items-center">
                  <span className="text-sm font-semibold text-neutral-900">{item.title}</span>
                  <DateRange
                    startDate={item.startDate}
                    endDate={item.endDate}
                    ongoing={item.ongoing}
                    className="text-xs text-neutral-600 italic"
                  />
                </div>
                {item.techStack?.length ? (
                  <span className="text-xs text-neutral-600 italic mt-1">
                    {Array.isArray(item.techStack) ? item.techStack.join(', ') : item.techStack}
                  </span>
                ) : null}
                <RichText
                  html={item.description}
                  breakable
                  className="text-xs text-neutral-800 break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap"
                />
              </div>
            )}
          />
        </Section>

        {/* Interests */}
        <Section
          id="interests"
          title={interests?.title || 'Interests'}
          visible={!!interests?.items?.length}
          titleClassName="uppercase tracking-wide text-sm font-bold text-black mt-5 gap-1 mb-2.5"
          divider="line"
          dividerClassName="bg-black w-full h-[1.5px]"
        >
          <div className="flex flex-row flex-wrap gap-2">
            {interests?.items?.map((item, i) => (
              <Badge
                key={typeof item === 'string' ? item : i}
                className="flex flex-row gap-1 items-center justify-center w-fit px-2 py-0.5 bg-[#f2f2f2] rounded-md text-xs text-black font-normal whitespace-wrap"
              >
                {typeof item === 'string' ? item : (item as any)?.items?.join(', ')}
              </Badge>
            ))}
          </div>
        </Section>

        {/* Achievements */}
        <Section
          id="achievements"
          title={achievements?.title || 'Achievements'}
          visible={!!achievements?.items?.length}
          titleClassName="uppercase tracking-wide text-sm font-bold text-black mt-5 gap-1 mb-2.5"
          divider="line"
          dividerClassName="bg-black w-full h-[1.5px]"
        >
          <div className="flex flex-row flex-wrap gap-2">
            {achievements?.items?.map((item, i) => (
              <Badge
                key={typeof item === 'string' ? item : i}
                className="flex gap-1 items-center justify-center w-fit px-2 py-0.5 bg-[#f2f2f2] rounded-md text-xs text-black font-normal break-words"
              >
                {typeof item === 'string' ? item : (item as any)?.items?.join(', ')}
              </Badge>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section
          id="certifications"
          title={certifications?.title || 'Certifications'}
          visible={!!certifications?.items?.length}
          titleClassName="uppercase tracking-wide text-sm font-bold text-black mt-5 gap-1 mb-2.5"
          divider="line"
          dividerClassName="bg-black w-full h-[1.5px]"
        >
          <ItemList
            items={certifications?.items ?? []}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <div className="flex flex-col gap-1 mt-3 leading-none" style={{ breakInside: 'avoid' }}>
                <div className="flex flex-row justify-between items-center">
                  <span className="text-sm font-semibold text-neutral-900">{item.title}</span>
                  <DateRange
                    startDate={item.startDate}
                    endDate={item.endDate}
                    ongoing={item.ongoing}
                    className="text-xs text-neutral-600 italic"
                  />
                </div>
                {item.issuer ? (
                  <span className="text-xs text-neutral-700">{item.issuer}</span>
                ) : null}
              </div>
            )}
          />
        </Section>
      </div>
    </PageContainer>
  );
}
