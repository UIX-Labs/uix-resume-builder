import { BookOpen } from 'lucide-react';

export function BlogHeader() {
  return (
    <div className="mb-12 text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
        <BookOpen className="h-4 w-4" />
        Pika Resume Blog
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Career Tips & Insights</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
        Expert advice on resume building, job searching, and career growth. Stay ahead with the latest tips to land your
        dream job.
      </p>
    </div>
  );
}
