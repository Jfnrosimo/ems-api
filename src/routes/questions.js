import { Router } from 'express';

import Questions from '../models/questions.js';
import Sections from '../models/sections.js';
import { requireUser } from '../auth.js';
import urls from '../urls.js';

const router = Router();

//Get the header token
router.use(requireUser);

//Fetch all Questions
router.get('', async (request, response) => {
	try {
		const results = await Questions.find();
		response.json(results);
	} catch (error) {
		return response.status(400).json({ error });
	}
});

//Create a Questions for a Section
router.post('', async (request, response) => {
	const newQuestions = new Questions(request.body);
	await newQuestions
		.save()
		.then((result) => {
			Sections.updateOne(
				{ _id: request.body._id },
				{ $push: { questions: result._id.toString() } },
			)
				.then(() => response.status(204).send(newQuestions))
				.catch((err) => response.status(400).send(err));
		})
		.catch((error) => response.status(400).send(error));
});

//Fetch a Questions
router.get('/:id', async (request, response) => {
	Questions.findOne({ _id: request.params.id })
		.then((result) => response.status(200).send(result))
		.catch((error) => response.status(404).send(error));
});

//Update a  Questions
router.put('/:id', async (request, response) => {
	try {
		const updateUser = await Questions.updateOne(
			{ _id: request.params.id },
			{ $set: request.body },
		)
			.then((result) => {
				if (result.modifiedCount === 1) {
					response.status(204).send(result);
				}
			})
			.catch((error) => response.status(404).send(error));
	} catch (error) {
		response.status(400).json({ error });
	}
});

export default router;
