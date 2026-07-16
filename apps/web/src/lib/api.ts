function resolveApiUrl(): string {
  if (process.env.NEXT_PUBLIC_USE_EMBEDDED_API === 'true') {
    return '/api/v1';
  }

  const configured = process.env.NEXT_PUBLIC_API_URL;
  if (configured && !configured.includes('api.mantraglobaledu.com')) {
    return configured;
  }

  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:4000/api/v1';
  }

  return '/api/v1';
}

const API_URL = resolveApiUrl();

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, headers: customHeaders, ...rest } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers,
    ...rest,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
}

export { API_URL };
