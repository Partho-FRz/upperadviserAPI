import mongoose from 'mongoose';
import express from 'express';
import user from './router/user.js';
import auth from './router/auth.js';
import category from './router/category.js';

const app = express();
app.use(express.json());

const uri =
  'mongodb+srv://onto:DLS3IOdyPGt904SL@upperadviser.grrkc.mongodb.net/upperadviser?retryWrites=true&w=majority';

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log('mongodb atlas connected');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/category', category);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
