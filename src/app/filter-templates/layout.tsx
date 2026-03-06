import Header from '@/widgets/landing-page/ui/header-section';
import FooterSection from '@widgets/landing-page/ui/footer-section';

export default function AllTemplatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        min-h-screen
        bg-cover
        bg-center
        relative
      "
    >
      {/* Background Overlay for better readability */}
      <div className="absolute inset-0 bg-white/80 z-0" />

      <div className="relative z-10">
        <Header />

        <main className="mt-10 min-h-[70vh]">{children}</main>

        <div className="mt-20">
          <FooterSection />
        </div>
      </div>
    </div>
  );
}
