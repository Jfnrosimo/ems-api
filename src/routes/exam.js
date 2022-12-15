import { Router } from "express";

import Exam from "../models/exam.js";
import { requireUser } from "../auth.js";

const router = Router();

//Get the header token
router.use(requireUser);

//Fetch all Exam
router.get(
  "",
  async (request, response) => {
    try {
      const results = await Exam.find();
      response.json(results);
    } catch (error) {
      return response.status(400).json({ error })
    }
  });

//Create a Exam
router.post(
  "",
  async (request, response) => {
      const newExam = new Exam(request.body)
      await newExam.save()
      .then(result => {
        response.status(204).send(result);
    })
    .catch(error => response.status(400).send(error))
  });

//Fetch a Exam
router.get(
  "/:id",
  async (request, response) => {
    Exam.findOne({ _id: request.params.id })
		.then((result) => response.status(200).send(result))
		.catch((error) => response.status(404).send(error));
  });

//Update a  Exam
router.put(
  "/:id",
  async (request, response) => {
      try {
        const updateUser = await Exam.updateOne({_id : request.params.id},
          { $set: request.body })
          .then(result => {
            if (result.modifiedCount === 1) {
                response.status(204).send(result);
            }
        })
        .catch(error => response.status(404).send(error))
    } catch (error) {
      response.status(400).json({ error });
    }}
);

export default router;
