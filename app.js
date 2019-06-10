const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
// Exercise 1
app.get('/sum', (req, res) => {
  const numA = parseInt(req.query.a),
  numB = parseInt(req.query.b);

  if (!numA) {
    return res.status(400).send('Please provide a first number with the key of "a" ')
  }
  if (!numB) {
    return res.status(400).send('Please provide a second number with the key of "b"')
  }

  res.send(`The sum of ${numA} and ${numB} is ${numA + numB}`)
})
// Exercise 2
app.get('/cipher', (req, res) => {

})
app.listen(8000, () => {
  console.log('listening on 800');
})
