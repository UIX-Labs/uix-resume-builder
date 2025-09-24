'use client';

export default function WelcomeHeader({ userName }: { userName: string }) {
  return (
    <div className="flex items-center gap-3 px-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-[rgb(23,23,23)] font-semibold text-4xl leading-tight tracking-tight">
          Welcome, {userName}
        </h1>

        <p className="text-[rgb(149,157,168)] font-normal text-base leading-5 tracking-tight">
          create your first custom resume to apply for jobs
        </p>
      </div>
    </div>
  );
}
