import Link from 'next/link';
import React, { Component } from 'react';
import { IconName } from 'react-icons/fa6';

export class Student_Register extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				username: '',
				email: '',
				password: '',
				confirmPassword: '',
			},
			loading: false,
			color: 'green',
		};
	}

	render() {
		return (
			<>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						this.setState.loading = true;
						if (this.state.password !== this.state.confirmPassword) {
							alert('passwords do not match');
						} else {
							console.log(this.state);
							this.setState.loading = false;
						}
					}}
					className='flex flex-col gap-10 min-h-[50vh] max-w-2xl p-10 items-center border bg-white dark:bg-black shadow-lg'>
					<h1 className='text-2xl'>Register</h1>

					<label
						htmlFor='username'
						className='w-full'>
						FullName:
						<input
							className='p-2 text-slate-700 mt-2 border accent-fuchsia-700 w-full text-[0.8rem] flex-1'
							type='text'
							placeholder='Enter full name'
							name='username'
							value={this.state.username}
							onChange={(e) => this.setState({ username: e.target.value })}
						/>
					</label>
					<label
						htmlFor='email'
						className='w-full'>
						Email:
						<input
							className='p-2 text-slate-700 mt-2 border accent-fuchsia-700 w-full text-[0.8rem] flex-1'
							type='email'
							placeholder='Enter email'
							name='email'
							value={this.state.email}
							onChange={(e) => this.setState({ email: e.target.value })}
						/>
					</label>
					<label
						htmlFor='password'
						className='w-full'>
						Password:
						<input
							className='p-2 w-full mt-2 border accent-fuchsia-700 text-slate-700 text-[0.8rem]'
							type='password'
							placeholder='Enter password'
							name='password'
							value={this.state.password}
							onChange={(e) => this.setState({ password: e.target.value })}
						/>
					</label>
					<label
						htmlFor='confirmPassword'
						className='w-full'>
						Confirm Password:
						<input
							className='p-2 w-full mt-2 border accent-fuchsia-700 text-slate-700 text-[0.8rem]'
							type='password'
							placeholder='Enter confirm password'
							name='confirmPassword'
							value={this.state.confirmPassword}
							onChange={(e) =>
								this.setState({ confirmPassword: e.target.value })
							}
						/>
					</label>
					<button
						className='p-2 bg-fuchsia-700 text-white'
						type='submit'
						disabled={this.state.loading}
						onClick={() => {
							;
						}}>
						Submit
					</button>
					<p className='datk:text-slate-100'>
						Already have an account?{' '}
						<Link
							className='text-blue-600'
							href='/users/register'>
							Login
						</Link>
					</p>
				</form>
			</>
		);
	}
}
