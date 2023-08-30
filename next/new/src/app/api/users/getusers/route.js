import connect from '@/dbcofig/connect';
import { User } from '@/models/userModel';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		connect();
		const data = await User.find({});
		const response = NextResponse.json(
			{
				sucess: 'sucess',
				data,
			},
			{ status: 200 }
		);
		return response;
	} catch (error) {
		return NextResponse.json(
			{
				sucess: 'error',
				error: error.message,
			},
			{ status: 400 }
		);
	}
}
