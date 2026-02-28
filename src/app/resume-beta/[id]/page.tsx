'use client';

import { useParams } from 'next/navigation';
import { BuilderPage } from '@widgets/resume-builder-beta';

/**
 * App layer: route entry point only. Zero business logic.
 */
export default function ResumeBetaPage() {
  const params = useParams();
  const id = params.id as string;

  return <BuilderPage resumeId={id} />;
}
