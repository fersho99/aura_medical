/** Página: Contacto — Server wrapper que inyecta datos de Supabase */

import { getContenido } from '@/lib/contenido'
import ContactoClient from './ContactoClient'
import { CLINIC_ADDRESS, CLINIC_EMAIL, CLINIC_PHONE } from '@/lib/constants'

export const metadata = {
  title: 'Contacto | Aura Medical',
  description: 'Contáctanos por teléfono, correo o WhatsApp. Horarios de atención y ubicación de Aura Medical en San Luis Río Colorado, Sonora.',
}

export default async function ContactoPage() {
  const contenido = await getContenido()
  const c = contenido.contacto ?? {}

  return (
    <ContactoClient
      direccion={c.direccion       || CLINIC_ADDRESS}
      telefono={c.telefono         || CLINIC_PHONE}
      email={c.email               || CLINIC_EMAIL}
      urgencias={c.urgencias       || '911'}
      horario={c.horario           || 'Lun–Vie 8:00 – 20:00  |  Sáb 9:00 – 14:00'}
      mapa_url={c.mapa_url}
      hero_badge={c.hero_badge}
      hero_titulo={c.hero_titulo}
      hero_subtitulo={c.hero_subtitulo}
    />
  )
}
