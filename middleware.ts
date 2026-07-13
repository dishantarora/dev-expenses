import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    console.log(`[middleware] ${request.method} ${request.nextUrl.pathname}`);
    const authDemo = request.cookies.get("auth-demo");
    if(!authDemo && request.nextUrl.pathname.startsWith("/expenses")){
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();   
}

export const config = {
    matcher: ["/expenses/:path*", "/api/:path*"],
};