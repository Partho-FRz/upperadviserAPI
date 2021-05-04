import Joi from 'joi';
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
    uppercase: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
});

export const Category = mongoose.model('Catergory', categorySchema);

export const schema = Joi.object({
  name: Joi.string().max(50).required(),
});
