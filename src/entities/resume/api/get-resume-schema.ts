import type { FormSchema } from '../types/resume-form';
import { data } from './schema-data';

export async function getResumeSchema(): Promise<FormSchema> {
  return Promise.resolve(data as FormSchema);
}
