const API_BASE = (import.meta as any)?.env?.VITE_API_BASE ?? "http://localhost:4000";

type OnUnauthorized = () => void;
let onUnauthorized: OnUnauthorized | null = null;

export function setOnUnauthorized(cb: OnUnauthorized | null) {
  onUnauthorized = cb;
}

async function request(path: string, init: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('__kinGuardServerToken') : undefined;
  const headers: Record<string, string> = { ...(init.headers as Record<string, string> || {}) };
  if (token) headers['x-session-token'] = token;
  if (!headers['Content-Type'] && init.body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (res.status === 401) {
    try {
      if (onUnauthorized) {
        onUnauthorized();
      } else {
        // fallback: clear token and redirect to /auth to ensure we don't silently no-op
        try {
          if (typeof window !== 'undefined') {
            try { window.localStorage.removeItem('__kinGuardServerToken'); } catch (e) {}
            window.location.href = '/auth';
          }
        } catch (e) {}
      }
    } catch (e) {
      // swallow
    }
    throw new Error('UNAUTHORIZED');
  }
  const text = await res.text();
  try {
    const json = text ? JSON.parse(text) : null;
    if (!res.ok) throw json || new Error(`HTTP ${res.status}`);
    return json;
  } catch (e) {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return null;
  }
}

export const apiClient = {
  get: (path: string) => request(path, { method: 'GET' }),
  post: (path: string, body?: unknown) => request(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: (path: string, body?: unknown) => request(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  del: (path: string) => request(path, { method: 'DELETE' }),
};

export default apiClient;
