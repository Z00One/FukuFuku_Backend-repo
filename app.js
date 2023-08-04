require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
}));

app.use(express.json());

const router = require('./routes')(app);

app.listen(process.env.PORT, () => {
});