export type Rol = 'super_admin' | 'admin' | 'editor' | 'recepcionista'

export const ROL_LABELS: Record<Rol, string> = {
  super_admin:   'Super Admin',
  admin:         'Administrador',
  editor:        'Editor',
  recepcionista: 'Recepcionista',
}

export const ROL_COLORS: Record<Rol, string> = {
  super_admin:   'bg-purple-500/10 text-purple-400 border-purple-500/20',
  admin:         'bg-teal-500/10 text-teal-400 border-teal-500/20',
  editor:        'bg-blue-500/10 text-blue-400 border-blue-500/20',
  recepcionista: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

// Rutas a las que tiene acceso cada rol.
// super_admin: no necesita lista — tiene acceso a todo.
const RUTAS_POR_ROL: Record<Rol, string[]> = {
  super_admin:   [],  // vacío = sin restricciones
  admin:         ['/admin/dashboard', '/admin/medicos', '/admin/especialidades', '/admin/unidades', '/admin/noticias', '/admin/testimonios', '/admin/citas', '/admin/mensajes', '/admin/aseguradoras', '/admin/cms', '/admin/hitos'],
  editor:        ['/admin/dashboard', '/admin/noticias', '/admin/testimonios', '/admin/cms'],
  recepcionista: ['/admin/dashboard', '/admin/citas', '/admin/mensajes'],
}

/** Devuelve true si el rol tiene acceso a la ruta dada. */
export function puedeAcceder(rol: string, pathname: string): boolean {
  if (rol === 'super_admin') return true
  const rutas = RUTAS_POR_ROL[rol as Rol] ?? []
  return rutas.some(r => pathname === r || pathname.startsWith(r + '/'))
}

/** Menú items con el rol mínimo requerido. */
export const MENU_ITEMS = [
  { href: '/admin/dashboard',      label: 'Dashboard',       icon: 'dashboard',        roles: ['super_admin','admin','editor','recepcionista'] },
  { href: '/admin/medicos',        label: 'Médicos',          icon: 'medical_services', roles: ['super_admin','admin'] },
  { href: '/admin/especialidades', label: 'Especialidades',   icon: 'science',          roles: ['super_admin','admin'] },
  { href: '/admin/unidades',       label: 'Unidades',         icon: 'business',         roles: ['super_admin','admin'] },
  { href: '/admin/cms',            label: 'CMS Visual',       icon: 'edit_document',    roles: ['super_admin','admin','editor'] },
  { href: '/admin/noticias',       label: 'Noticias',         icon: 'newspaper',        roles: ['super_admin','admin','editor'] },
  { href: '/admin/testimonios',    label: 'Testimonios',      icon: 'format_quote',     roles: ['super_admin','admin','editor'] },
  { href: '/admin/citas',          label: 'Citas',            icon: 'calendar_month',   roles: ['super_admin','admin','recepcionista'] },
  { href: '/admin/mensajes',       label: 'Mensajes',         icon: 'inbox',            roles: ['super_admin','admin','recepcionista'] },
  { href: '/admin/aseguradoras',   label: 'Aseguradoras',     icon: 'health_and_safety',roles: ['super_admin','admin'] },

  { href: '/admin/hitos',          label: 'Hitos / Historia', icon: 'timeline',         roles: ['super_admin','admin'] },
  { href: '/admin/usuarios',       label: 'Usuarios',         icon: 'manage_accounts',  roles: ['super_admin'] },
] as const
