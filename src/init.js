import mongoose from 'mongoose';
import log from './log.js';

const dbInit = async (mongoUrl) => {
	if (!mongoUrl) {
		throw new Error(
			'MongoDB URL not configured - set DATABASE_URL env variable',
		);
	}
	try {
		await mongoose.connect(mongoUrl);
		//  log.debug(`Connected to MongoDB at ${mongoUrl}`);
	} catch (err) {
		// log.fatal("Error connecting to database:", err);
		throw err;
	}
};

export default dbInit;
