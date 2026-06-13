import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { puedeAcceder } from '@/lib/roles'

const ROL_COOKIE   = 'am-rol'
const ROL_COOKIE_TTL = 60 * 30 // 30 minutos — revalida el rol cada media hora

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // ── 1. Sin sesión → al login ───────────────────────────────────────────────
  if (!user) {
    // Limpiar cookie de rol al cerrar sesión
    supabaseResponse.cookies.delete(ROL_COOKIE)
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return supabaseResponse
  }

  // ── 2. Con sesión yendo al login → al dashboard ───────────────────────────
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // ── 3. Verificar rol ───────────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    // Leer el rol desde la cookie para evitar una consulta a BD en cada request
    const cachedRol = request.cookies.get(ROL_COOKIE)?.value

    if (cachedRol) {
      // Cache hit — solo verificar permisos, sin consulta a BD
      if (!puedeAcceder(cachedRol, pathname)) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      // Renovar TTL de la cookie
      supabaseResponse.cookies.set(ROL_COOKIE, cachedRol, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: ROL_COOKIE_TTL,
        path: '/admin',
      })
      return supabaseResponse
    }

    // Cache miss — consultar BD (primera visita o cookie expirada)
    const { data: perfil } = await supabase
      .from('perfiles')
      .select('rol, activo')
      .eq('id', user.id)
      .single()

    if (perfil && !perfil.activo) {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL('/admin/login?error=inactivo', request.url))
    }

    if (perfil && !puedeAcceder(perfil.rol, pathname)) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    // Guardar el rol en la cookie para las próximas navegaciones
    const rolParaCache = perfil?.rol ?? 'sin_rol'
    supabaseResponse.cookies.set(ROL_COOKIE, rolParaCache, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: ROL_COOKIE_TTL,
      path: '/admin',
    })
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*'],
}
