import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClientFeatures } from "@/components/animations/client-features";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Sinnergia | Agencia de Marketing Digital",
    template: "%s | Sinnergia",
  },
  description:
    "Transformamos marcas con estrategias digitales que generan resultados reales. Marketing digital, branding, desarrollo web y publicidad.",
  keywords: [
    "marketing digital",
    "agencia de marketing",
    "branding",
    "desarrollo web",
    "publicidad digital",
    "redes sociales",
    "SEO",
    "sinnergia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ClientFeatures />
          {children}
          <div className="noise-overlay" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  );
}
