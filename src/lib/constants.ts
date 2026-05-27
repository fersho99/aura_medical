/** Constantes globales de Aura Medical */

export const WA_NUMBER      = '526531332053'
export const EMERGENCY_TEL  = '911'
export const CLINIC_EMAIL   = 'info@auramedical.com'
export const CLINIC_ADDRESS = 'Av. de la Innovación 45, Chihuahua, México'
export const CLINIC_PHONE   = '653 133 2053'

/**
 * Genera una URL de WhatsApp con mensaje pre-escrito.
 * @example WA_URL('Hola, me gustaría agendar una cita.')
 */
export const WA_URL = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
