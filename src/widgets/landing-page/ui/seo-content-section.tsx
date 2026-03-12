import Link from 'next/link';

export function SeoContentSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50/50" aria-labelledby="seo-content-heading">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <h2
          id="seo-content-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-8 text-center"
        >
          The AI Resume Builder Trusted by Professionals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-gray-700 text-base leading-relaxed">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Build ATS-Optimized Resumes in Minutes</h3>
            <p className="mb-4">
              Pika Resume helps you create professional, ATS-friendly resumes that stand out to recruiters and pass
              applicant tracking systems. Whether you are a fresh graduate, an experienced professional, or making a
              career change, our AI-powered resume builder adapts to your needs. Choose from our{' '}
              <Link href="/templates" className="text-blue-600 hover:underline font-medium">
                professionally designed resume templates
              </Link>{' '}
              or start from scratch with intelligent content suggestions.
            </p>
            <p>
              Our smart suggestions help you write impactful bullet points with strong action verbs and quantified
              achievements. Import your LinkedIn profile in one click, upload an existing resume for AI enhancement, or{' '}
              <Link href="/roast" className="text-blue-600 hover:underline font-medium">
                roast your resume
              </Link>{' '}
              to get brutally honest feedback on what needs improvement.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Expert Reviews from Top Companies</h3>
            <p className="mb-4">
              Go beyond AI with our{' '}
              <Link href="/expert-review" className="text-blue-600 hover:underline font-medium">
                expert resume review service
              </Link>
              . Get detailed, line-by-line feedback from professionals at Google, Microsoft, TikTok, and 20+ other
              leading companies. Every bullet point is reviewed for clarity, impact, and relevance to your target roles,
              delivered to your inbox within 3 business days.
            </p>
            <p>
              Tailor your resume to any job posting with our Job Description Matching feature. Paste a job description
              and our AI analyzes both documents to identify keyword gaps, optimize your content for ATS compatibility,
              and position your experience for the specific role. Read our{' '}
              <Link href="/blog" className="text-blue-600 hover:underline font-medium">
                resume writing tips blog
              </Link>{' '}
              to learn more about crafting winning resumes.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
          <Link
            href="/templates"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            Resume Templates
          </Link>
          <Link
            href="/roast"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            AI Resume Roast
          </Link>
          <Link
            href="/expert-review"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            Expert Review
          </Link>
          <Link
            href="/blog"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            Resume Tips Blog
          </Link>
          <Link
            href="/upload-resume"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            Upload Resume
          </Link>
          <Link
            href="/about-us"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
