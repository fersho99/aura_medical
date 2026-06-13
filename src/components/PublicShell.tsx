'use client'

/** Envuelve las páginas públicas con Header y Footer.
 *  Las rutas /admin quedan excluidas — tienen su propio layout. */

import { usePathname } from 'next/navigation'

interface PublicShellProps {
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
}

export default function PublicShell({ children, header, footer }: PublicShellProps) {
  const pathname = usePathname()
  const isAdmin  = pathname.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <>
      {header}
      <div className="flex-1">{children}</div>
      {footer}
    </>
  )
}
