import type { NextConfig } from "next";

// Evaluamos el entorno actual (desarrollo vs producción)
const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  // 1. Ocultar la cabecera X-Powered-By (Mitigación de Fuga de Información)
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ivuewfivmlrqzrsctwrp.storage.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ── Cabeceras existentes ──────────────────────────────────────────
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",         value: "SAMEORIGIN" },
          { key: "X-XSS-Protection",        value: "1; mode=block" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()" },

          // ── HSTS (Activado permanentemente) ───────────────────────────────
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },

          // ── Content Security Policy ───────────────────────────────────────
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              
              // 2. Scripts: Removemos 'unsafe-eval' en producción (Mitigación ZAP)
              `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""}`,
              
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              
              // 3. Imágenes: Se removió el comodín (wildcard) "https:"
              // Si usas otro dominio para imágenes (ej. bucket de Supabase), agrégalo aquí.
              "img-src 'self' data: blob: https://images.unsplash.com https://ivuewfivmlrqzrsctwrp.storage.supabase.co",
              
              "frame-src 'self' https://maps.google.com https://www.google.com",
              "frame-ancestors 'self'",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;