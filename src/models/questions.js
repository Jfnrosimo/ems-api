import mongoose from 'mongoose';

import { handleDuplicateKeyError } from './error.js';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const schema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
		},
		typeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Types',
			autopopulate: true,
			default: [],
		},
		status: {
			type: String,
			default: 'active',
		},
		choices: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Choices',
				autopopulate: true,
				default: [],
			},
		],
		answerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Answer',
			autopopulate: true,
			default: [],
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

const Questions = mongoose.model('Questions', schema);

export default Questions;
