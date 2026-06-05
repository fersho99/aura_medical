'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const menuItems = [
  { href: '/admin/dashboard',     label: 'Dashboard',      icon: 'dashboard' },
  { href: '/admin/medicos',       label: 'Médicos',         icon: 'medical_services' },
  { href: '/admin/noticias',      label: 'Noticias',        icon: 'newspaper' },
  { href: '/admin/citas',         label: 'Citas',           icon: 'calendar_month' },
  { href: '/admin/aseguradoras',  label: 'Aseguradoras',    icon: 'health_and_safety' },
  { href: '/admin/configuracion', label: 'Configuración',   icon: 'settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const router   = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  const initial      = user?.email?.[0]?.toUpperCase() ?? 'A'
  const currentLabel = menuItems.find(m =>
    pathname === m.href || (m.href !== '/admin/dashboard' && pathname.startsWith(m.href))
  )?.label ?? 'Dashboard'

  return (
    <div className="min-h-screen bg-gray-950 flex">

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">

        {/* Brand */}
        <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-500/10 border border-teal-500/30 rounded-lg flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-teal-400 text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_hospital
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm tracking-tight leading-none">AURA MEDICAL</p>
            <p className="text-gray-500 text-xs mt-0.5">Panel Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const active = pathname === item.href ||
              (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  active
                    ? 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white border-transparent'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px] shrink-0"
                  style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-gray-800 flex flex-col gap-1">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 text-xs font-bold shrink-0">
              {initial}
            </div>
            <p className="text-gray-400 text-xs truncate">{user?.email ?? '—'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition border border-transparent hover:border-red-500/20 w-full"
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">logout</span>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-8 h-14 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-white font-medium">{currentLabel}</span>
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
