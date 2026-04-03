import { QueryClient, QueryFunction } from "@tanstack/react-query";

let sessionExpiredCallback: (() => void) | null = null;
let sessionExpiredTriggered = false;
let sessionExpiredRedirectSuppressed = false;

export function setSessionExpiredCallback(cb: () => void) {
  sessionExpiredCallback = cb;
}

/**
 * Suppress the automatic redirect-to-login that fires on 401.
 * Use this when a page (e.g. an active quiz) needs to handle auth
 * expiry in-context rather than losing the user's work.
 * Always call enableSessionExpiredRedirect() on unmount.
 */
export function suppressSessionExpiredRedirect() {
  sessionExpiredRedirectSuppressed = true;
}

export function enableSessionExpiredRedirect() {
  sessionExpiredRedirectSuppressed = false;
}

export function isSessionExpiredRedirectSuppressed() {
  return sessionExpiredRedirectSuppressed;
}

function handle401() {
  if (!sessionExpiredTriggered && sessionExpiredCallback) {
    sessionExpiredTriggered = true;
    sessionExpiredCallback();
    setTimeout(() => { sessionExpiredTriggered = false; }, 5000);
  }
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    if (res.status === 401) {
      handle401();
    }
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    if (res.status === 401) {
      handle401();
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
