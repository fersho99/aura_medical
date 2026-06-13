'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { MENU_ITEMS, ROL_LABELS, ROL_COLORS, type Rol } from '@/lib/roles'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user,      setUser]      = useState<any>(null)
  const [rol,       setRol]       = useState<Rol | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const router   = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const loadPerfil = async (userId: string) => {
      const { data } = await supabase
        .from('perfiles')
        .select('rol, nombre')
        .eq('id', userId)
        .single()
      setRol((data?.rol ?? null) as Rol | null)
    }

    // onAuthStateChange se dispara inmediatamente con la sesión actual
    // y también después del redirect de login — resuelve el problema del primer render
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const u = session?.user ?? null
        setUser(u)
        if (u) await loadPerfil(u.id)
        else setRol(null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  const initial      = user?.email?.[0]?.toUpperCase() ?? 'A'
  const currentLabel = MENU_ITEMS.find(m =>
    pathname === m.href || (m.href !== '/admin/dashboard' && pathname.startsWith(m.href + '/'))
  )?.label ?? 'Dashboard'

  // Filtra el menú según el rol del usuario
  const menuFiltrado = rol
    ? MENU_ITEMS.filter(item => (item.roles as readonly string[]).includes(rol))
    : MENU_ITEMS.filter(item => item.href === '/admin/dashboard')

  return (
    <div className="min-h-screen bg-gray-950 flex">

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-gray-900 border-r border-gray-800 flex flex-col shrink-0 transition-all duration-200`}>

        {/* Brand */}
        <div className="px-3 py-4 border-b border-gray-800 flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 bg-teal-500/10 border border-teal-500/30 rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-teal-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_hospital
            </span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white font-bold text-sm tracking-tight leading-none">AURA MEDICAL</p>
              <p className="text-gray-500 text-xs mt-0.5">Panel Admin</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 flex flex-col gap-0.5 overflow-y-auto">
          {menuFiltrado.map((item) => {
            const active = pathname === item.href ||
              (item.href !== '/admin/dashboard' && pathname.startsWith(item.href + '/'))
            return (
              <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  active
                    ? 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white border-transparent'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0"
                  style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                {!collapsed && item.label}
              </Link>
            )
          })}
        </nav>

        {/* User + Rol + Logout */}
        <div className="p-2 border-t border-gray-800 flex flex-col gap-1">
          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 text-xs font-bold shrink-0">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs truncate">{user?.email ?? '—'}</p>
                {rol && (
                  <span className={`inline-block mt-0.5 px-1.5 py-0.5 text-[10px] font-medium rounded border ${ROL_COLORS[rol]}`}>
                    {ROL_LABELS[rol]}
                  </span>
                )}
              </div>
            </div>
          )}
          <button onClick={handleLogout} title={collapsed ? 'Cerrar sesión' : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition border border-transparent hover:border-red-500/20 w-full ${collapsed ? 'justify-center' : ''}`}>
            <span className="material-symbols-outlined text-[20px] shrink-0">logout</span>
            {!collapsed && 'Cerrar sesión'}
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-4 h-14 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCollapsed(c => !c)}
              title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-800 hover:text-white transition"
            >
              <span className="material-symbols-outlined text-[20px]">
                {collapsed ? 'menu_open' : 'menu'}
              </span>
            </button>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-white font-medium">{currentLabel}</span>
            </div>
          </div>
          <span className="text-gray-500 text-xs">
            {new Date().toLocaleDateString('es-MX', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            })}
          </span>
        </header>

        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
