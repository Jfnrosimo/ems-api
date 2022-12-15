import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { generatePasswordHash, validatePassword } from "../password.js";
import User from '../models/users.js';
import urls from '../urls.js'
import { requireUser } from "../auth.js";

const router = Router();

const generateRandomToken = () =>
  randomBytes(48).toString("base64").replace(/[+/]/g, ".");

//Register A User
router.post(urls.auth.register, async (request, response) => {

  const { email, password } = request.body
  const hashedPassword = await generatePasswordHash(password)
  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    return response.status(409).send('User already exists.')
  }
  try {

    const newUser = await User({
      ...request.body,
      email: email,
      password: hashedPassword
    })
    await newUser.save();

    //Create a token to ensure the validity of user
    const token = jwt.sign({ newUser }, newUser.email, {
      expiresIn: 60 * 24
    })
    const userId = newUser._id;
    return response.status(201).send({ token, userId })
  } catch (error) {
    response.status(400).json({ error: "Bad Request" },);
  }
})

// Login User
router.post(urls.auth.login, async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return response.status(404).json('User not found')
  }
  const passwordValid = await validatePassword(password, user.password);
  try {
    if (user && passwordValid) {

      //Create a token to ensure the validity of user
      const jwttoken = jwt.sign({ user }, user.email, {
        expiresIn: 60 * 24
      })
      const userId = user._id;
      return response.status(201).send({ jwttoken, userId, user })
    }
    return response.status(400).json('Invalid Credentials')
  } catch (error) {
    response.status(400).json({ status: "Bad Request 2" });
  }
})

router.use(requireUser);

router.put(urls.auth.changePassword + "/:id",
  async (request, response) => {
    const user = await User.findOne({ _id: request.params.id }).exec();
    const newPassword = await generatePasswordHash(request.body);
    try {
      const existingPassword = user[0].password;
      const updateUser = await User.updateOne({ password: newPassword });
      response.status(204).send({ updateUser });
    } catch (error) {
      response.status(400).json({ error });
    }
  })

router.post(urls.auth.logout, async (request, response) => {
  const { email } = request.body;
  const user = await User.findOne({ email }).exec();
  user.token = generateRandomToken();
  if (user) {
    response.status(204).json({ status: 'logout', data: user });
  }
})
export default router;