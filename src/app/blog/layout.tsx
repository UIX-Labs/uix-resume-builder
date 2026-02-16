import Header from '@/widgets/landing-page/ui/header-section';
import FooterSection from '@widgets/landing-page/ui/footer-section';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        min-h-screen
        bg-[url('/images/blog/background-img.png')]
        bg-cover
        bg-center
        opacity-20%
      "
    >
      <Header />

      {/* Blog Content */}
      <div className="mt-5">
        <main>{children}</main>
      </div>

      {/* Footer */}
      <div className="mt-15">
        <FooterSection />
      </div>
    </div>
  );
}
