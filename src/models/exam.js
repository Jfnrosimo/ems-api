import mongoose from 'mongoose';

import { handleDuplicateKeyError } from './error.js';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const schema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
		},
		authorId: {
			type: mongoose.ObjectId,
			ref: 'Users',
			autopopulate: true,
		},
		status: {
			type: String,
			default: 'active',
		},
		sections: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Sections',
				autopopulate: true,
				default: [],
			},
		],
		students: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users',
				autopopulate: true,
				default: [],
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

schema.plugin(mongooseAutoPopulate);
schema.post('save', handleDuplicateKeyError);
schema.post('update', handleDuplicateKeyError);
schema.post('findOneAndUpdate', handleDuplicateKeyError);
schema.post('insertMany', handleDuplicateKeyError);

const Exam = mongoose.model('Exam', schema);

export default Exam;
