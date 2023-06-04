const express = require('express');
const app = express();

app.use(express.json());

const router = require('./routes')(app);

app.listen(3000, () => {
  console.log(3000);
})