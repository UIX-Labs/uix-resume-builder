import { HardcodedLinksInput } from './hardcoded-links-input';

export function LinksInput({ data, onChange, section }: { data: any; onChange: (data: any) => void; section: any }) {
  return <HardcodedLinksInput data={data} onChange={onChange} section={section} />;
}
