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
  const queryText = req.query.text;
  const queryShift = 1;
  if (req.query.shift) {
      queryShift = parseInt(req.query.shift)
  }

  if (!queryText) {
    return res.status(400).send('Please provide a string to cipher')
  }


 let newString = '';
 for (let i = 0; i < queryText.length; i++) {
   let initialCharCode = queryText[i].charCodeAt(0);
   let newCharCode = initialCharCode + queryShift;
   let newLetter = String.fromCharCode(newCharCode);
   newString += newLetter;
 }

 res.send(newString);
})
app.listen(8000, () => {
  console.log('listening on 800');
})
