import mongoose from 'mongoose';

import { handleDuplicateKeyError } from './error.js';

const schema = new mongoose.Schema(
	{
		answer: {
			type: String,
			trim: true,
		},
		status: {
			type: String,
			default: 'active',
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

schema.post('save', handleDuplicateKeyError);
schema.post('update', handleDuplicateKeyError);
schema.post('findOneAndUpdate', handleDuplicateKeyError);
schema.post('insertMany', handleDuplicateKeyError);

const Answer = mongoose.model('Answer', schema);

export default Answer;
