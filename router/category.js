import express from 'express';
const router = express.Router();
import { Category, schema } from '../models/category.js';
import _ from 'lodash';

router.get('/', async (req, res) => {
  try {
    let category = await Category.find().select({ __v: 0 });

    res.status(200).send(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    await schema.validateAsync(req.body);

    let category = await Category.findOne({
      name: req.body.name,
    }).count();
    if (category > 0) return res.status(400).send('Category Already Exists');

    category = new Category(_.pick(req.body, ['name']));

    await category.save();
    return res.status(200).send(category);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    let update = await Category.updateOne(
      { _id: req.params.id },
      { $set: { name: req.body.name, isActive: req.body.isActive } }
    );

    if (update.n === 0) {
      return res.status(400).send('Not Found');
    } else if (update.nModified === 0) {
      return res.status(400).send('Not Updated');
    }

    return res.status(200).send('Value Updated');
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export default router;
