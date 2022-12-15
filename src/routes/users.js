import { Router } from "express";

import User from "../models/users.js";
// import { requireUser } from "../auth.js";
import DatabaseError from "../models/error.js";

const router = Router();

//Get the header token
// router.use(requireUser);

//Fetch all User
router.get("", async (request, response) => {
  try {
    const results = await User.find();
    response.json(results);
  } catch (error) {
    return response.status(400).json({ error });
  }
});

//Create a User
router.post("", async (request, response) => {
  const newUser = new User(request.body);
  await newUser
    .save()
    .then((result) => {
      response.status(204).send(result);
    })
    .catch((error) => response.status(400).send(error));
});

//Fetch a User
router.get("/:id", async (request, response) => {
  User.findOne({ _id: request.params.id })
    .then((result) => response.status(200).send(result))
    .catch((error) => response.status(404).send(error));
});

//Update a  User
router.put("/:id", async (request, response) => {
  try {
    const updateUser = await User.updateOne(
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
