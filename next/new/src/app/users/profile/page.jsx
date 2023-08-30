'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
	const { data: session } = useSession();
  
	return (
		<div className='max-w-5xl mx-auto'>
			{session ? <h1>{session.user.email}</h1> : router.push('/users/login')}
		</div>
	);
}

export default Page;
