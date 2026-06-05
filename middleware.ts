import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// Only run on admin routes — refreshes the session and enforces the gate there.
export const config = {
  matcher: ["/admin/:path*"],
};
