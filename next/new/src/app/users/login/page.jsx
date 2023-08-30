'use client';
import styles from './login.module.css';
import { useState, useRef } from 'react';
import React from 'react';
import Link from 'next/link';
import { FiAtSign } from 'react-icons/fi';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import { HiEye, HiUser, HiEyeOff } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/helpers/helper';
import { signIn, signOut, useSession } from 'next-auth/react';

function Page() {
	const [show, setShow] = useState(null);
	const { data: session } = useSession();
	const router = useRouter();
	const emailref = useRef(null);
	const passwordref = useRef(null);

	return (
		<>
			<div
				className={`flex max-w-full bg-slate-500 min-h-screen items-center justify-center  ${styles.bg}`}>
				<div className='flex p-10 justify-center sm:max-[300px]: md:max-w-[400px] mx-auto  bg-slate-100 text-slate-900 flex-1 min-h-[90vh] shadow-2xl rounded-md flex-col items-center px-16 gap-8'>
					<form
						className='flex flex-col justify-center items-center gap-8 w-full'
						onSubmit={async (e) => {
							try {
								e.preventDefault();
								let email = emailref.current.value;
								let password = passwordref.current.value;
								console.log(email, password);
								const user = await loginUser({ email, password });
								if (user && user.status == 200) {
									router.push('/');
								}
							} catch (error) {
								console.log(error.message);
							}
						}}>
						<h1 className='text-2xl'>Login</h1>

						<div className='w-full'>
							<label htmlFor='email'>Email:</label>

							<div className='shadow-md justify-between flex items-center bg-white rounded-md w-full'>
								<input
									type='email'
									id='email'
									placeholder='Email'
									className='p-2 px-4 rounded-md shadow-sm w-4/5 bg-transparent border-none outline-none'
									ref={emailref}
								/>
								<HiUser className='text-gray-400 mr-3' />
							</div>
						</div>
						<div className='w-full'>
							<label htmlFor='password'>Password:</label>
							<div className='shadow-md flex justify-between items-center bg-white rounded-md'>
								<input
									type={show ? 'text' : 'password'}
									id='password'
									placeholder='password'
									className='p-2 rounded-md shadow-sm w-4/5 bg-transparent border-none outline-none px-4'
									ref={passwordref}
								/>
								{/* {show ? (
									<HiEyeOff className='text-gray-400 mr-3' />
								) : (
									<HiEye className='text-gray-400 mr-3' />
								)} */}
							</div>
						</div>
						<button
							className='py-3  rounded-md bg-blue-700 text-white hover:bg-blue-500 w-full'
							type='submit'>
							Login
						</button>
						<p className='dark:text-slate-100 text-slate-900 text-sm'>
							Don&apos;t have an account?{' '}
							<Link
								className=' text-blue-700'
								href='/users/register'>
								Register
							</Link>
						</p>
					</form>
					<div className='flex gap-4 w-full flex-col items-center'>
						<button
							className='w-full text-[0.8rem] py-3 hover:bg-slate-200 border-2 shadow-md rounded-md flex justify-center items-center gap-2'
							onClick={async () => {
								signIn('google', {
									callbackUrl: 'http://localhost:3000/',
								});
							}}>
							<FaGoogle className='text-[1.2rem]' />
							Continue with Google
						</button>
						<button
							className='w-full text-[0.8rem] py-3 hover:bg-slate-200 border-2 shadow-md rounded-md flex justify-center items-center gap-2'
							onClick={() => {
								signIn('github', {
									callbackUrl: 'http://localhost:3000/',
								});
							}}>
							<FaGithub className='text-[1.2rem]' />
							Continue with Github
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Page;


/*
<h1>login</h1>
			<div>
				<div className='flex gap-5 flex-col max-w-sm mt-10'>
					<button
						className='text-slate-100 bg-emerald-400 py-2 px-4 rounded-md'
						onClick={async () => {
							const res = await loginUser({
								email: 's.sathishmechdesign@gmail.com',
								password: 'Sathish@123',
							});
							console.log(res);
						}}>
						login
					</button>
					<button
						className='text-slate-100 bg-emerald-400 py-2 px-4 rounded-md'
						onClick={async () => {
							const res = await signOut();
							console.log('logged out', res);
						}}>
						log out
					</button>
					<button
						className='text-slate-100 bg-emerald-400 py-2 px-4 rounded-md'
						onClick={async () => {
							signIn('google', { callbackUrl: '/' });
						}}>
						continue with google
					</button>
				</div>
				<div>
					<p className='text-slate-100'>{session?.user?.email}</p>
				</div>
			</div>
			*/
