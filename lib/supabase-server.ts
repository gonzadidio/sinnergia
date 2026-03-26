import { createServerClient as createSSRServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const emptyResponse = { data: null, error: null };
const emptyQuery = {
  select: () => emptyQuery,
  eq: () => emptyQuery,
  neq: () => emptyQuery,
  order: () => emptyQuery,
  limit: () => emptyQuery,
  single: () => Promise.resolve(emptyResponse),
  then: (resolve: (value: typeof emptyResponse) => void) => Promise.resolve(emptyResponse).then(resolve),
};

const mockClient = {
  from: () => emptyQuery,
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
} as unknown as ReturnType<typeof createSSRServerClient>;

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return mockClient;
  }

  const cookieStore = cookies();

  return createSSRServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component - can't set cookies
        }
      },
    },
  });
}
