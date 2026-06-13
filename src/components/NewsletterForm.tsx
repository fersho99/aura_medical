'use client'

/** Formulario de suscripción al boletín — guarda en BD y redirige a WhatsApp */

import { useState } from 'react'

export default function NewsletterForm() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value.trim()
    if (!email) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/newsletter', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ correo: email }),
      })

      if (res.status === 429) {
        setError('Demasiados intentos. Espera un momento e intenta de nuevo.')
        return
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.error ?? 'No se pudo completar la suscripción.')
        return
      }
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.')
      return
    } finally {
      setLoading(false)
    }

    // Confirmación vía WhatsApp (flujo existente)
    window.open(
      `https://wa.me/526531332053?text=${encodeURIComponent(`Hola, me gustaría suscribirme al boletín de Aura Medical. Correo: ${email}`)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="flex flex-col gap-xs max-w-2xl mx-auto">
      <form className="flex flex-col sm:flex-row gap-sm" onSubmit={handleSubmit}>
        <input
          name="email"
          className="flex-1 rounded-full border border-surface-variant bg-surface px-md py-sm type-body focus:ring-2 focus:ring-primary focus:border-primary shadow-sm outline-none"
          placeholder="Su correo electrónico"
          type="email"
          required
          maxLength={150}
          autoComplete="email"
          disabled={loading}
        />
        <button className="btn-dark whitespace-nowrap" type="submit" disabled={loading}>
          {loading ? 'Enviando…' : 'Suscribirse'}
        </button>
      </form>
      {error && <p className="type-label text-error text-center">{error}</p>}
    </div>
  )
}
