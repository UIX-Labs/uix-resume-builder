import AuthPageWidget from '@widgets/auth-page';
import Image from 'next/image';
import { BACKGROUNDS } from '@shared/lib/image-assets';

export default function AuthPage() {
  return (
    <div className="w-full h-full">
      <Image src={BACKGROUNDS.LANDING_PAGE} alt="Background" fill className="object-cover -z-10" priority />
      <div>
        <AuthPageWidget />
      </div>
    </div>
  );
}
