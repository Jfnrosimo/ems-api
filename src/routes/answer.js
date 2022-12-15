import { Router } from 'express';

import Answer from '../models/answer.js';
import { requireUser } from '../auth.js';
import Questions from '../models/questions.js';

const router = Router();

//Get the header token
router.use(requireUser);

//Fetch all Answer
router.get('', async (request, response) => {
	try {
		const results = await Answer.find();
		response.json(results);
	} catch (error) {
		return response.status(400).json({ error });
	}
});

//Create a Answer
router.post('', async (request, response) => {
	const newAnswer = new Answer(request.body);
	await newAnswer
		.save()
		.then((result) => {
			Questions.updateOne(
				{ _id: request.body._id },
				{ $push: { questions: result._id.toString() } },
			)
				.then(() => response.status(204).send(comment))
				.catch((err) => response.status(400).send(err));
		})
		.catch((error) => response.status(400).send(error));
});

//Fetch a Answer
router.get('/:id', async (request, response) => {
	Answer.findOne({ _id: request.params.id })
		.then((result) => response.status(200).send(result))
		.catch((error) => response.status(404).send(error));
});

//Update a  Answer
router.put('/:id', async (request, response) => {
	try {
		const updateUser = await Answer.updateOne(
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
