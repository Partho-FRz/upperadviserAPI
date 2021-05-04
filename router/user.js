import express from 'express';
const router = express.Router();
import { User, schema } from '../models/user.js';
import _ from 'lodash';
import bcrypt from 'bcrypt';

router.get('/:id', async (req, res) => {
  try {
    let users = await User.findOne({
      _id: req.params.id,
      isAdmin: true,
    }).count();
    if (users < 1) return res.status(401).send('You are not authorised');
    const skip = (req.body.pageNo - 1) * req.body.itemCount;
    users = await User.find()
      .select({ password: 0, __v: 0 })
      .limit(req.body.itemCount)
      .skip(skip);

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

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
    await schema.validateAsync(req.body);
    let user = await User.findOne({
      email: req.body.email,
    }).count();
    if (user > 0) return res.status(400).send('User already registered');

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
