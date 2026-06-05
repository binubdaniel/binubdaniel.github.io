import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Runs on every matched request: refreshes the Supabase auth cookie and gates
// /admin/* so only the ADMIN_EMAIL user (with a valid session) can get in.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: getUser() revalidates the token with Supabase (don't trust
  // getSession() in middleware). Keep this call right after client creation.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = !!user && user.email === process.env.ADMIN_EMAIL;
  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";

  // Unauthenticated (or wrong email) hitting a protected admin route → login.
  if (pathname.startsWith("/admin") && !isLoginRoute && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Already-authenticated admin hitting the login page → dashboard.
  if (isLoginRoute && isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return response;
}
