import Header from '@widgets/landing-page/ui/header-section';
import FooterSection from '@widgets/landing-page/ui/footer-section';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Same header as landing page */}
      <Header />

      {/* Blog Content */}
      <main>{children}</main>

      {/* Same footer as landing page */}
      <FooterSection />
    </div>
  );
}
