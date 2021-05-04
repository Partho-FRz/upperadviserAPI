import express from 'express';
const router = express.Router();
import { User } from '../models/user.js';
import _ from 'lodash';
import bcrypt from 'bcrypt';
router.use(express.json());

// import dotenv from 'dotenv';
// dotenv.config();
// import pkg from 'express-openid-connect';
// const { auth, requiresAuth } = pkg;

// router.use(
//   auth({
//     authRequired: false,
//     auth0Logout: true,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//     idpLogout: true,
//   })
// );
// router.get('/', async (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'logged out');

// });
// router.get('/profile', requiresAuth(), async (req, res) => {
//   res.send('working');
// });
router.post('/', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).select({
      __v: 0,
      _id: 0,
      isAdmin: 0,
    });
    if (!user) return res.status(400).send('invalid email or password');
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send('invalid email or password');

    return res.status(200).send(user);
  } catch (error) {
    console.log(error.message, 'errrrrrr');
    return res.status(400).send(error.message);
  }
});

export default router;
