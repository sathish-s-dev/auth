import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Please provide username'],
		unique: true,
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Please provide email'],
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
	},
});

const providerSchema = new Schema({
	username: {
		type: String,
		required: [true, 'please provide username'],
		unique: true,
	},
	image: {
		type: String,
	},
	email: {
		type: String,
		required: [true, 'please provide email'],
	},
	provider: {
		type: String,
	},
});

export const User =
	mongoose.models.users || mongoose.model('users', userSchema);

export const Provider =
	mongoose.models.providers || mongoose.model('providers', providerSchema);
