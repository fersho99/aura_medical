import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ── Cabeceras existentes ──────────────────────────────────────────
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",          value: "DENY" },
          { key: "X-XSS-Protection",         value: "1; mode=block" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },

          // ── Content Security Policy ───────────────────────────────────────
          // Next.js necesita 'unsafe-inline' y 'unsafe-eval' en script-src
          // para su runtime. En producción se puede refinar con nonces.
          {
            key: "Content-Security-Policy",
            value: [
              // Solo recursos propios por defecto
              "default-src 'self'",
              // Scripts: self + Next.js runtime inline/eval
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              // Estilos: self + Google Fonts + inline (Tailwind)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fuentes: Google Fonts CDN
              "font-src 'self' https://fonts.gstatic.com",
              // Imágenes: self + data URIs + HTTPS (Unsplash, Supabase Storage)
              "img-src 'self' data: blob: https:",
              // Iframes: Google Maps
              "frame-src https://maps.google.com https://www.google.com",
              // Conexiones API: self + Supabase (HTTP + WebSocket)
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
              // Sin plugins (Flash, etc.)
              "object-src 'none'",
              // Base URL restringida al origen
              "base-uri 'self'",
              // Forms solo al mismo origen
              "form-action 'self'",
            ].join("; "),
          },

          // ── HSTS (activar cuando el dominio tenga HTTPS permanente) ───────
          // Descomenta en producción después de configurar SSL:
          // { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
