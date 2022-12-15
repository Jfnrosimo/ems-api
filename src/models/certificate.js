import mongoose from 'mongoose';

import { handleDuplicateKeyError } from './error.js';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const schema = new mongoose.Schema(
	{
		studentId: {
			type: mongoose.ObjectId,
			ref: 'Users',
			autopopulate: true,
		},
		qrcode: {
			type: String,
			trim: true,
		},
		title: {
			type: String,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		mentorId: {
			type: mongoose.ObjectId,
			ref: 'Users',
			autopopulate: true,
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

const Certificate = mongoose.model('Certificate', schema);

export default Certificate;
