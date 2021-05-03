import express from 'express';
const router = express.Router();
import { User, schema } from '../models/user.js';
import _ from 'lodash';
import bcrypt from 'bcrypt';

router.get('/me', async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select({
      password: 0,
      __v: 0,
      _id: 0,
      isAdmin: 0,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await schema.validateAsync(req.body);
    console.log(data, 'ddddddddddd');
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) return res.status(400).send('User already registered');

    user = new User(
      _.pick(req.body, [
        'firstName',
        'lastName',
        'country',
        'email',
        'password',
        'isAdmin',
      ])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export default router;
