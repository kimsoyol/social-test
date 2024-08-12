
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { protectedRoutes, publicRoutes } from '@/routes'
 

const adminRoutes = ['/dashboard']

 
export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = req.nextUrl.pathname.startsWith(protectedRoutes)
  const isPublicRoute = publicRoutes.includes(path)
  const isAdminRoute = adminRoutes.includes(path)
 
  //const cookie = cookies().get('session')?.value
  const session = await auth()
  const isAdmin = session?.user?.role === 'admin';

 // Redirect to / if the user is not authenticated
  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 

   // Redirect to /explore if the user is not admin
   if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/explore', req.nextUrl))
  }


  // Redirect to /explore if the user is authenticated
  if (
    isPublicRoute &&
    session?.user &&
    !req.nextUrl.pathname.startsWith('/explore')
  ) {
    return NextResponse.redirect(new URL('/explore', req.nextUrl))
  } 


 
  return NextResponse.next()
}
 

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};