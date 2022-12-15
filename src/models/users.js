import mongoose from 'mongoose';
import validator from 'validator';
import { randomBytes } from 'crypto';

import { handleDuplicateKeyError } from './error.js';
import isEmail from 'validator/lib/isEmail.js';
import { isPasswordHash } from '../password.js';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const generateRandomToken = () =>
	randomBytes(48).toString('base64').replace(/[+/]/g, '.');

const schema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			validate: {
				validator: validator.isEmail,
				message: 'Invalid email',
			},
		},
		password: {
			type: String,
			required: true,
			validate: { validator: isPasswordHash, message: 'Invalid password hash' },
			trim: true,
		},
		firstName: {
			type: String,
			trim: true,
		},
		lastName: {
			type: String,
			trim: true,
		},
		status: {
			type: String,
			default: 'active',
		},
		type: {
			type: String,
			default: 'student',
		},
		role: {
			type: String,
			default: 'user',
		},
		section: {
			type: String,
			trim: true,
		},
		rating: {
			type: Number,
		},
		token: {
			type: String,
			default: generateRandomToken,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

schema.plugin(mongooseAutoPopulate);
schema.post('save', handleDuplicateKeyError);
schema.post('update', handleDuplicateKeyError);
schema.post('findOneAndUpdate', handleDuplicateKeyError);
schema.post('insertMany', handleDuplicateKeyError);

const Users = mongoose.model('Users', schema);

export default Users;
