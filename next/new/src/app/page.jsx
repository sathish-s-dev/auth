'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Student_Register } from '@/components/Student_Register';
import { useState } from 'react';

export default function Home() {
	const [name, setName] = useState('');
	const { data: session } = useSession();
	return (
		<main className='flex min-h-screen flex-col items-center justify-between  max-w-5xl mx-auto'>
			{name}

			<p onClick={() => setName('sathish')}>{session?.user?.email}</p>
			<Student_Register />
		</main>
	);
}
