import { NextResponse } from 'next/server';


export async function middleware(request, event) {
    const publicPaths = ["/sign-in", "/sign-up"];
    const path = request.nextUrl.pathname;
    const isPublicPath = publicPaths.includes(path);

    const refreshToken = request.cookies.get('refreshToken')?.value;
    // Allow unauthenticated users to access public pages for signing in and signing up.
    if (!refreshToken && isPublicPath) return NextResponse.next();
    // Prevent authenticated user to visit public pages.
    if (refreshToken && isPublicPath) return NextResponse.redirect(new URL('/', request.url));
    // If no refreshToken exists (indicating either no sign-in or an expired refreshToken),
    // delete session cookies and redirect to the sign-in page.
    if (!refreshToken) {
        const response = NextResponse.redirect(new URL('/sign-in', request.url));
        const sessionCookies = request.cookies.getAll();
        sessionCookies.forEach(cookie => {
            response.cookies.delete(cookie.name);
        });
        return response;
    }
}


export const config = {
  matcher: ['/', '/sign-in', '/sign-up'],
}

