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

// Exercise 3

app.get('/lotto', (req, res) => {
  // number listener
  if (req.query.numbers.length !== 6) {
    return res.status(400).send('Please provide 6 lottery numbers')
  }
  // create our array of numbers
  let ourArray = req.query.numbers.map(num => {
    return parseInt(num);
  });
  // start matches at 0
  let matches = 0;
  // create random array
  let randomArray = [];
  for (let i = 0; i < 6; i ++) {
   let randomNumber = Math.floor(Math.random() * 21);
   randomArray.push(randomNumber);
  }

  // validate numbers are between 1 and 20
  for (var i = 0; i < ourArray.length; i++) {
    if ((ourArray[i] === 0) || (ourArray[i] > 21)) {
      return res.status(400).send(`Numbers must be between 1 and 20. You entered ${ourArray[i]} `)
    }
    if (randomArray.includes(ourArray[i])) {
      matches += 1;
    }
  }

  // handle matches
  if (matches < 4) {
    res.send('Sorry, you lose')
  } else {
    if (matches === 4) {
      res.send('Congratulations, you win a free tickets')
    }
    if (matches === 5) {
      res.send('Congratulations! You win $100')
    }
    if (matches === 6) {
      res.send('Wow! Unbelievable! You could have won the mega millions!')
    }
  }


})

app.listen(8000, () => {
  console.log('listening on 800');
})
