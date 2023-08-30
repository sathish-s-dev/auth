import connect from '@/dbcofig/connect';
import { compare } from 'bcryptjs';
import { User, Provider } from '@/models/userModel';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from 'next-auth/react';
// import clientPromise from '@/lib/mongodb';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';

// adapter: MongoDBAdapter(clientPromise),
const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.Google_client_Id,
			clientSecret: process.env.Google_client_Secret,
		}),
		GithubProvider({
			clientId: process.env.GitHub_client_Id,
			clientSecret: process.env.GitHub_client_Secret,
		}),
		// Credentials
		CredentialsProvider({
			id: 'credentials',
			name: 'credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Enter your email',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Enter your password',
				},
			},
			async authorize(credentials) {
				// console.log(credentials);
				connect();
				const user = await User.findOne({ email: credentials.email });
				// console.log(user);
				if (!user) {
					throw new Error('User not found');
				}
				const verify = compare(credentials.password, user.password);
				if (!verify) {
					throw new Error('Wrong password');
				}
				return user;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/users/login',
	},
	callbacks: {
		signIn: async ({ user, account, profile }) => {
			// console.log(profile)
			console.log(user, 'user');
			console.log(account, 'account');

			try {
				await connect();
				const olduser = await Provider.findOne({ email: user.email, provider: account.provider });
				if (!olduser) {
					console.log(profile);
					const newUser = {
						username: user.name,
						image: user.image,
						email: user.email,
						provider: account.provider,
					};
					console.log(newUser);
					Provider.create({
						...newUser,
					});
				} 
				// else if (olduser && account.provider !== olduser.provider) {
				// 	const newUser = {
				// 		username: user.name,
				// 		image: user.image,
				// 		email: user.email,
				// 		provider: account.provider,
				// 	};
				// 	console.log(newUser);
				// 	Provider.create({
				// 		...newUser,
				// 	});
				// } 
				else {
					console.log('user already exists');
				}
			} catch (error) {
				console.log(error.message);
			}
			return user;
		},
		jwt: async function ({ token, user }) {
			// console.log(user, 'from jwt callback');
			user && (token.user = user);
			return token;
		},
		session: async ({ session, token }) => {
			const user = token.user;
			session.user = user;
			// console.log({ message: 'user from session', user, token, session });

			return session;
		},
	},
};

const Next = NextAuth(authOptions);
export { Next as GET, Next as POST };
