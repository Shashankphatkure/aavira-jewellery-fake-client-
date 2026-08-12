import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Cookie-free client for public, unauthenticated reads (product catalog,
 * reviews). Using this instead of the SSR server client keeps product pages
 * eligible for static generation — the SSR client's cookies() call would
 * force dynamic rendering even though the catalog needs no user context.
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
