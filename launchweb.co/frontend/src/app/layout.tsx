import type { Metadata } from 'next';
import { Inter, Unbounded } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const unbounded = Unbounded({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700', '900'],
  variable: '--font-unbounded',
});

export const metadata: Metadata = {
  title: 'PROJECT | Premium Digital',
  description: 'We build next-generation digital experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${unbounded.variable} bg-black text-white antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}