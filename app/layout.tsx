import type { Metadata } from 'next';
import { Open_Sans, Roboto_Slab } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-slab',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VOTELEC – Saisie des bulletins',
  description: 'Application de saisie des bulletins électoraux',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${openSans.variable} ${robotoSlab.variable} h-full`}
    >
      <body className="h-full">{children}</body>
    </html>
  );
}
