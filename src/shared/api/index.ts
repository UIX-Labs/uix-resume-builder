async function fetcher<T>(url: string, { options }: { options?: RequestInit } = {}): Promise<T> {
  const isFormData = options?.body instanceof FormData;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "https://resume-builder-be.craftstacks.co"}/${url}`, {
    ...(options ?? {}),
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...(options?.headers ?? {}),
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

export { fetcher as fetch };
