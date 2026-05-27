'use client'

/** Formulario de suscripción al boletín — redirige a WhatsApp con el correo */

export default function NewsletterForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value.trim()
    if (!email) return
    window.open(
      `https://wa.me/526531332053?text=${encodeURIComponent(`Hola, me gustaría suscribirme al boletín de Aura Medical. Correo: ${email}`)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-sm max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        name="email"
        className="flex-1 rounded-full border border-surface-variant bg-surface px-md py-sm type-body focus:ring-2 focus:ring-primary focus:border-primary shadow-sm outline-none"
        placeholder="Su correo electrónico"
        type="email"
        required
        maxLength={100}
        autoComplete="email"
      />
      <button className="btn-dark whitespace-nowrap" type="submit">Suscribirse</button>
    </form>
  )
}
