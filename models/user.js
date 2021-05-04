import Joi from 'joi';
import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
// const config = require('config');
export const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    uppercase: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    uppercase: true,
  },
  country: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 3,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// userSchema.methods.generateAuthToken = function () {
//   return (jwt.sign({
//     id: this.id,
//     isAdmin: this.isAdmin
//   }, config.get('jwtPrivateKey')));
// }

export const User = mongoose.model('User', userSchema);

export const schema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  country: Joi.string().required(),
  email: Joi.string().min(3).max(255).required().email(),
  password: Joi.string().min(3).max(255).required(),
  isAdmin: Joi.boolean(),
});

// module.exports.userSchema = userSchema;
// module.exports.User = User;
// module.exports.validate = validate;
