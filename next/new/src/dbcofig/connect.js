import mongoose from 'mongoose';

export default async function connect() {
	try {
		const connection = await mongoose
			.connect(process.env.MONGODB_URI,{
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
			.then(() => {
				console.log('mongodb connected successfully');
			});
		return connection;
	} catch (error) {
		console.error(error);
	}
}
