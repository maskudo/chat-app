const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);

mongoose.set('strictQuery', false);
mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successfully');
  })
  .catch((err) => {
    console.error(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on Port ${process.env.PORT}`);
});
