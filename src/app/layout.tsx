import type { Metadata } from "next";
import "./globals.css";
import PublicShell from "@/components/PublicShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContenido } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "AURA MEDICAL - Excelencia Médica",
  description: "Precisión clínica y tecnología de vanguardia al servicio de su bienestar.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contenido = await getContenido()

  return (
    <html lang="es" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-background antialiased selection:bg-primary-container selection:text-on-primary-container flex flex-col min-h-screen">
        <PublicShell
          header={<Header />}
          footer={<Footer contacto={contenido.contacto} redes={contenido.redes} footer={contenido.footer} />}
        >
          {children}
        </PublicShell>
      </body>
    </html>
  );
}
