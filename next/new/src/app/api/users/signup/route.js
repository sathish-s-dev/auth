import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connect from '@/dbcofig/connect';
import { User } from '@/models/userModel';
import {hash, compare, genSalt } from 'bcryptjs';

export async function POST(req, res) {
	try {
		const data = await req.json();
    console.log(data);
		const { username, password, email } = data;

		// create salt
		const salt = await genSalt(10);

		// hash password
		const hashPassword = await hash(password, salt);

		connect();

		const user = await User.findOne({ email });
		console.log('user exists', user);
		if (user) {
			return NextResponse.json({ message: 'user exists' }, { status: 400 });
		}

		// create user
		let newUser = await User.create({
			username,
			email,
			password: hashPassword,
		});
		console.log(newUser);
		return NextResponse.json({
			message: 'saved successfully',
			sucess: 'sucess',
			newUser,
		});
	} catch (error) {
		return NextResponse.json({
			sucess: 'error',
			error: error.message,
		});
	}
}
