import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Signs the admin out (clears the Supabase auth cookies) and returns to login.
export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/admin/login", request.url), {
    status: 303,
  });
}
