import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Kupony restauracyjne',
    description: 'Znajdź i przeglądaj najlepsze kupony restauracyjne',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl">
        <body className={inter.className}>
        <header
            className="text-white shadow-md h-20 bg-repeat bg-center"
            style={{ backgroundImage: "url('/background.png')", backgroundSize: "auto 100%" }}
        >
            <div className="container mx-auto px-4 h-full flex items-center gap-4">
                <img src="/logo.png" alt="Logo" className="h-full w-auto max-h-full object-contain" />
            </div>
        </header>




        {children}

        <footer className="bg-gray-100 py-6 mt-8">
            <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
                <p>© {new Date().getFullYear()} Kupony restauracyjne. Wszelkie prawa zastrzeżone.</p>
            </div>
        </footer>
        </body>
        </html>
    );
}
