import { signIn, signOut, useSession } from 'next-auth/react';

export const loginUser = async ({ email, password }) => {
	const res = await signIn('credentials', {
		redirect: false,
		email,
		password,
		callbackUrl: '/',
	});

	return res;
};
