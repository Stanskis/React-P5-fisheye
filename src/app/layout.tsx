import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Header from '../components/Header/Header';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fisheye',
  description:
    'Fisheye est une application de photographie qui met en avant les photographes et leurs œuvres. Découvrez les talents de la photographie à travers une interface élégante et intuitive.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${dmSans.variable} h-full antialiased`}>
      <body>
        <div className="wrapper mx-auto h-full">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
