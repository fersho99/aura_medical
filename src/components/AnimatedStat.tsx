'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  valor:  string
  sufijo: string
  label:  string
}

function parseNumber(valor: string): number {
  return parseInt(valor.replace(/,/g, ''), 10)
}

export default function AnimatedStat({ valor, sufijo, label }: Props) {
  const [display, setDisplay] = useState(0)
  const ref      = useRef<HTMLDivElement>(null)
  const animated = useRef(false)
  const target   = parseNumber(valor)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration  = 1800
          const steps     = 60
          const increment = target / steps
          let current = 0
          let step    = 0

          const timer = setInterval(() => {
            step++
            current = Math.min(Math.round(increment * step), target)
            setDisplay(current)
            if (current >= target) clearInterval(timer)
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  const formatted = valor.includes(',')
    ? display.toLocaleString('en-US')
    : display.toString()

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-black text-primary-fixed tracking-tight">
        {formatted}{sufijo}
      </p>
      <p className="type-label text-on-primary/70 mt-xs">{label}</p>
    </div>
  )
}
