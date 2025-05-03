import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Restaurant Coupons',
    description: 'Find and browse the best restaurant coupons',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <header className="bg-purple-700 text-white py-4 shadow-md">
            <div className="container mx-auto px-4">
                <h1 className="text-xl font-bold">Restaurant Coupons</h1>
            </div>
        </header>

        {children}

        <footer className="bg-gray-100 py-6 mt-8">
            <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
                <p>© {new Date().getFullYear()} Restaurant Coupons. All rights reserved.</p>
            </div>
        </footer>
        </body>
        </html>
    );
}