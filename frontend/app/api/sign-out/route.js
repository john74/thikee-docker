import { NextResponse } from 'next/server';


export async function POST(request) {
    const response = NextResponse.redirect(new URL('/sign-in', request.url));
    const sessionCookies = request.cookies.getAll();
    sessionCookies.forEach(cookie => {
        response.cookies.delete(cookie.name);
    });
    return response;
}