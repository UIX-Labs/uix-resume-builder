import AuthPageWidget from '@widgets/auth-page';
import Image from 'next/image';
import { CLOUDINARY_IMAGE_BASE_URL } from '@shared/lib/constants';

export default function AuthPage() {
  return (
    <div className="w-full h-full">
      <Image src={CLOUDINARY_IMAGE_BASE_URL + "/v1765386532/landing-page-bg_jgjrgv.svg"} alt="Background" fill className="object-cover -z-10" priority />
      <div>
        <AuthPageWidget />
      </div>
    </div>
  );
}
