'use client';

import { useState } from 'react';
import { Label } from '@shared/ui/label';
import { LabeledInput, SectionWrapper, RepeatableSection, StringListEditor } from './shared';

export function EditStep({
  resumeData,
  onChange,
}: {
  resumeData: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (section: string) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateSection = (section: string, items: any[]) => {
    onChange({ ...resumeData, [section]: { ...resumeData[section], items } });
  };

  const personalDetails = resumeData.personalDetails?.items?.[0] || {};

  const updatePersonalDetails = (field: string, value: any) => {
    const updated = { ...personalDetails, [field]: value };
    onChange({
      ...resumeData,
      personalDetails: { ...resumeData.personalDetails, items: [updated] },
    });
  };

  return (
    <div className="space-y-4">
      {/* Personal Details */}
      <SectionWrapper title="Personal Details" section="personalDetails" collapsed={collapsed} onToggle={toggleCollapse}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabeledInput label="Full Name" value={personalDetails.fullName || ''} onChange={(v) => updatePersonalDetails('fullName', v)} />
          <LabeledInput label="Job Title" value={personalDetails.jobTitle || ''} onChange={(v) => updatePersonalDetails('jobTitle', v)} />
          <LabeledInput label="Email" value={personalDetails.email || ''} onChange={(v) => updatePersonalDetails('email', v)} type="email" />
          <LabeledInput label="Phone" value={personalDetails.phone || ''} onChange={(v) => updatePersonalDetails('phone', v)} />
          <LabeledInput label="Address" value={personalDetails.address || ''} onChange={(v) => updatePersonalDetails('address', v)} />
          <LabeledInput label="City" value={personalDetails.city || ''} onChange={(v) => updatePersonalDetails('city', v)} />
          <LabeledInput label="State" value={personalDetails.state || ''} onChange={(v) => updatePersonalDetails('state', v)} />
          <LabeledInput label="Country" value={personalDetails.country || ''} onChange={(v) => updatePersonalDetails('country', v)} />
        </div>
        <div className="mt-4 space-y-1">
          <Label htmlFor="professional-summary">Professional Summary</Label>
          <textarea
            id="professional-summary"
            value={personalDetails.description || ''}
            onChange={(e) => updatePersonalDetails('description', e.target.value)}
            rows={4}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            placeholder="Brief professional summary..."
          />
        </div>
      </SectionWrapper>

      {/* Experience */}
      <SectionWrapper title="Experience" section="experience" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.experience?.items?.length || 0}>
        <RepeatableSection
          items={resumeData.experience?.items || []}
          onChange={(items) => updateSection('experience', items)}
          renderItem={(item, index, updateItem) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <LabeledInput label="Company" value={item.company || ''} onChange={(v) => updateItem({ ...item, company: v })} />
              <LabeledInput label="Position" value={item.position || ''} onChange={(v) => updateItem({ ...item, position: v })} />
              <LabeledInput label="Location" value={item.location || ''} onChange={(v) => updateItem({ ...item, location: v })} />
              <LabeledInput label="Link" value={item.link || ''} onChange={(v) => updateItem({ ...item, link: v })} />
              <LabeledInput label="Start Date" value={item.startDate || ''} onChange={(v) => updateItem({ ...item, startDate: v })} placeholder="e.g., Jan 2020" />
              <LabeledInput label="End Date" value={item.endDate || ''} onChange={(v) => updateItem({ ...item, endDate: v })} placeholder="e.g., Dec 2023 or Present" />
              <div className="col-span-full space-y-1">
                <Label htmlFor={`experience-description-${index}`}>Description</Label>
                <textarea
                  id={`experience-description-${index}`}
                  value={item.description || ''}
                  onChange={(e) => updateItem({ ...item, description: e.target.value })}
                  rows={4}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
                  placeholder="Job responsibilities and achievements..."
                />
              </div>
            </div>
          )}
          emptyItem={{ company: '', position: '', location: '', description: '', link: '', startDate: '', endDate: '', ongoing: false }}
        />
      </SectionWrapper>

      {/* Education */}
      <SectionWrapper title="Education" section="education" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.education?.items?.length || 0}>
        <RepeatableSection
          items={resumeData.education?.items || []}
          onChange={(items) => updateSection('education', items)}
          renderItem={(item, _index, updateItem) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <LabeledInput label="Institution" value={item.institution || ''} onChange={(v) => updateItem({ ...item, institution: v })} />
              <LabeledInput label="Degree" value={item.degree || ''} onChange={(v) => updateItem({ ...item, degree: v })} />
              <LabeledInput label="Field of Study" value={item.fieldOfStudy || item.fieldofStudy || ''} onChange={(v) => updateItem({ ...item, fieldOfStudy: v })} />
              <LabeledInput label="Location" value={item.location || ''} onChange={(v) => updateItem({ ...item, location: v })} />
              <LabeledInput label="Start Date" value={item.startDate || ''} onChange={(v) => updateItem({ ...item, startDate: v })} />
              <LabeledInput label="End Date" value={item.endDate || ''} onChange={(v) => updateItem({ ...item, endDate: v })} />
              <LabeledInput label="Grade" value={item.grade || ''} onChange={(v) => updateItem({ ...item, grade: v })} />
            </div>
          )}
          emptyItem={{ institution: '', degree: '', fieldOfStudy: '', location: '', startDate: '', endDate: '', grade: '', ongoing: false }}
        />
      </SectionWrapper>

      {/* Skills */}
      <SectionWrapper title="Skills" section="skills" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.skills?.items?.length || 0}>
        <RepeatableSection
          items={resumeData.skills?.items || []}
          onChange={(items) => updateSection('skills', items)}
          renderItem={(item, _index, updateItem) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <LabeledInput label="Skill Name" value={item.name || ''} onChange={(v) => updateItem({ ...item, name: v })} />
              <LabeledInput label="Category" value={item.category || ''} onChange={(v) => updateItem({ ...item, category: v })} placeholder="e.g., Programming" />
              <LabeledInput label="Level" value={item.level || ''} onChange={(v) => updateItem({ ...item, level: v })} placeholder="e.g., Advanced" />
            </div>
          )}
          emptyItem={{ name: '', category: '', level: '' }}
          compact
        />
      </SectionWrapper>

      {/* Projects */}
      <SectionWrapper title="Projects" section="projects" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.projects?.items?.length || 0}>
        <RepeatableSection
          items={resumeData.projects?.items || []}
          onChange={(items) => updateSection('projects', items)}
          renderItem={(item, index, updateItem) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <LabeledInput label="Title" value={item.title || ''} onChange={(v) => updateItem({ ...item, title: v })} />
              <LabeledInput label="Link" value={item.link || ''} onChange={(v) => updateItem({ ...item, link: v })} />
              <LabeledInput label="Start Date" value={item.startDate || ''} onChange={(v) => updateItem({ ...item, startDate: v })} />
              <LabeledInput label="End Date" value={item.endDate || ''} onChange={(v) => updateItem({ ...item, endDate: v })} />
              <div className="col-span-full space-y-1">
                <Label htmlFor={`project-description-${index}`}>Description</Label>
                <textarea
                  id={`project-description-${index}`}
                  value={item.description || ''}
                  onChange={(e) => updateItem({ ...item, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
                />
              </div>
              <div className="col-span-full">
                <LabeledInput label="Tech Stack (comma-separated)" value={(item.techStack || []).join(', ')} onChange={(v) => updateItem({ ...item, techStack: v.split(',').map((s: string) => s.trim()).filter(Boolean) })} />
              </div>
            </div>
          )}
          emptyItem={{ title: '', description: '', techStack: [], link: '', startDate: '', endDate: '', ongoing: false }}
        />
      </SectionWrapper>

      {/* Certifications */}
      <SectionWrapper title="Certifications" section="certifications" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.certifications?.items?.length || 0}>
        <RepeatableSection
          items={resumeData.certifications?.items || []}
          onChange={(items) => updateSection('certifications', items)}
          renderItem={(item, _index, updateItem) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <LabeledInput label="Title" value={item.title || ''} onChange={(v) => updateItem({ ...item, title: v })} />
              <LabeledInput label="Issuer" value={item.issuer || ''} onChange={(v) => updateItem({ ...item, issuer: v })} />
              <LabeledInput label="Start Date" value={item.startDate || ''} onChange={(v) => updateItem({ ...item, startDate: v })} />
              <LabeledInput label="End Date" value={item.endDate || ''} onChange={(v) => updateItem({ ...item, endDate: v })} />
              <LabeledInput label="Link" value={item.link || ''} onChange={(v) => updateItem({ ...item, link: v })} />
            </div>
          )}
          emptyItem={{ title: '', issuer: '', link: '', startDate: '', endDate: '', ongoing: false }}
        />
      </SectionWrapper>

      {/* Achievements */}
      <SectionWrapper title="Achievements" section="achievements" collapsed={collapsed} onToggle={toggleCollapse} count={resumeData.achievements?.items?.length || 0}>
        <StringListEditor
          items={resumeData.achievements?.items || []}
          onChange={(items) => updateSection('achievements', items)}
          placeholder="Enter an achievement..."
        />
      </SectionWrapper>

      {/* Interests */}
      <SectionWrapper title="Interests" section="interests" collapsed={collapsed} onToggle={toggleCollapse}>
        <StringListEditor
          items={
            resumeData.interests?.items?.[0]?.items
              ? resumeData.interests.items[0].items
              : resumeData.interests?.items || []
          }
          onChange={(items) =>
            onChange({
              ...resumeData,
              interests: { items: [{ items }] },
            })
          }
          placeholder="Enter an interest..."
        />
      </SectionWrapper>
    </div>
  );
}
