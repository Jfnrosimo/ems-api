import { Router } from 'express';

import Sections from '../models/sections.js';
import { requireUser } from '../auth.js';
import Exam from '../models/exam.js';
const router = Router();

//Get the header token
router.use(requireUser);

//Fetch all Sections
router.get('', async (request, response) => {
	try {
		const results = await Sections.find();
		response.json(results);
	} catch (error) {
		return response.status(400).json({ error });
	}
});

//Create a Sections
router.post('', async (request, response) => {
	const newSections = new Sections(request.body);
	await newSections
		.save()
		.then((result) => {
			Exam.updateOne(
				{ _id: request.body._id },
				{ $push: { questions: result._id.toString() } },
			)
				.then(() => response.status(204).send(newSections))
				.catch((err) => response.status(400).send(err));
		})
		.catch((error) => response.status(400).send(error));
});

//Fetch a Sections
router.get('/:id', async (request, response) => {
	Sections.findOne({ _id: request.params.id })
		.then((result) => response.status(200).send(result))
		.catch((error) => response.status(404).send(error));
});

//Update a  Sections
router.put('/:id', async (request, response) => {
	try {
		const updateUser = await Sections.updateOne(
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
