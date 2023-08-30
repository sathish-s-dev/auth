import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
function Navbar() {
	const { data: session } = useSession();
	return (
		<div className='w-full bg-slate-100'>
			<div className='flex justify-between items-center px-12 max-w-5xl mx-auto  text-slate-950 '>
				<div className=''>
					<Link href={'/'}>
						<Image
							width={50}
							height={50}
							src={'/next.svg'}
							className='w-20 h-20'
							alt='logo'></Image>
					</Link>
				</div>
				<nav className='flex gap-6'>
					{session ? (
						<>
							<Link href={'/users/profile'}>profile</Link>

							<button onClick={async () => signOut()}>Logout</button>
						</>
					) : (
						<Link href={'/users/login'}>Login</Link>
					)}
				</nav>
			</div>
		</div>
	);
}

export default Navbar;
