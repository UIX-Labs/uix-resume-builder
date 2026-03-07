import { NotAccessibleModal } from './modal/not-accessible';

interface PageContainerProps {
  children: React.ReactNode;
  isLoading: boolean;
  error: Error | null;
}

function PageSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Loading resume...</p>
    </div>
  );
}

function PageContainer({ children, isLoading, error }: PageContainerProps) {
  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <>
      <NotAccessibleModal error={error} />

      {children}
    </>
  );
}

export default PageContainer;
