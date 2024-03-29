'use client';
import { NextAuthProvider } from '@/helpers/provider';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NextAuthProvider>
					<Navbar />
					{children}
				</NextAuthProvider>
			</body>
		</html>
	);
}
