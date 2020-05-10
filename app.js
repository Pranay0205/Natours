const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// console.log(process.env);

//------------------------------------------------//
//----------Middleware Function ------------------//
//------------------------------------------------//
app.use((req, res, next) => {
  console.log('Hello frome middleware 👋');
  next();
});

app.use(morgan('dev'));

app.use(express.json()); // For using middleware

app.use(express.static(`${__dirname}/public`)); //Express middleware for static file routing

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//---------------------------------------------------//
//-----------------ALL ROUTES-----------------//
//--------------------------------------------------//
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTours);
// app.delete('/api/v1/tours/:id', deleteTours);

app.use('/api/v1/tours', tourRouter); //Mounting Router
app.use('/api/v1/users', userRouter); //Mounting

module.exports = app;
