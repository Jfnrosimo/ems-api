import { Router } from "express";

import Types from "../models/types.js";
// import { requireUser } from '../auth.js';

const router = Router();

//Get the header token
// router.use(requireUser);

//Fetch all Types
router.get("", async (request, response) => {
  try {
    const results = await Types.find();
    response.json(results);
  } catch (error) {
    return response.status(400).json({ error });
  }
});

//Create a Types
router.post("", async (request, response) => {
  const newTypes = new Types(request.body);
  await newTypes
    .save()
    .then((result) => {
      response.status(204).send(result);
    })
    .catch((error) => response.status(400).send(error));
});

//Fetch a Types
router.get("/:id", async (request, response) => {
  Types.findOne({ _id: request.params.id })
    .then((result) => response.status(200).send(result))
    .catch((error) => response.status(404).send(error));
});

//Update a  Type
router.put("/:id", async (request, response) => {
  try {
    const updateUser = await Types.updateOne(
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
