import "./globals.css";
import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import localFont from 'next/font/local'
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const NotoSans = localFont({
  src: '../public/fonts/NotoSans.woff2',
  variable: '--font-sans',
});

export const Oswald = localFont({
  src: '../public/fonts/Oswald.woff2',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: {
    template: '%s | ALX-9',
    default: 'ALX-9 — Интерактивная аудиовизуальная инсталляция',
  },
  description: 'Погружение в кибернетический организм на стыке биомиметики и машинного обучения. Интерактивная инсталляция ALX-9.',
  openGraph: {
    title: 'ALX-9 — Интерактивная аудиовизуальная инсталляция',
    description: 'Погружение в кибернетический организм на стыке биомиметики и машинного обучения.',
    url: 'https://alx9.vercel.app',
    siteName: 'ALX-9',
    images: [
      {
        url: 'https://picsum.photos/seed/cyber/1200/630',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALX-9 — Интерактивная аудиовизуальная инсталляция',
    description: 'Погружение в кибернетический организм на стыке биомиметики и машинного обучения.',
    images: ['https://picsum.photos/seed/cyber/1200/630'],
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={cn(NotoSans.className, "font-sans")}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (theme === 'system' && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <Header />
            <main className="mt-[70px]">
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
