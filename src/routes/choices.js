import { Router } from "express";

import Choices from "../models/choices.js";
// import { requireUser } from '../auth.js';
import Questions from "../models/questions.js";
const router = Router();

//Get the header token
// router.use(requireUser);

//Fetch all Choices
router.get("", async (request, response) => {
  try {
    const results = await Choices.find();
    response.json(results);
  } catch (error) {
    return response.status(400).json({ error });
  }
});

//Create a Choices
router.post("", async (request, response) => {
  const newChoices = new Choices(request.body);
  await newChoices
    .save()
    .then((result) => {
      Questions.updateOne(
        { _id: request.body._id },
        { $push: { questions: result._id.toString() } }
      )
        .then(() => response.status(204).send(comment))
        .catch((err) => response.status(400).send(err));
    })
    .catch((error) => response.status(400).send(error));
});

//Fetch a Choices
router.get("/:id", async (request, response) => {
  Questions.findOne({ _id: request.params.id })
    .then((result) => response.status(200).send(result))
    .catch((error) => response.status(404).send(error));
});

//Update a  Choices
router.put("/:id", async (request, response) => {
  try {
    const updateUser = await Choices.updateOne(
      { _id: request.params.id },
      { $set: request.body }
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
