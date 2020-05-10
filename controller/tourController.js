const fs = require('fs');

//------------------------------------------------//
//----------PARSING JSON FILE INTO ARRAY----------//
//------------------------------------------------//

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'Bad Request', message: 'Missing Name or Price' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

//----------------------------------------------------------------//
//---------------GET OPERATION AND ID DEFINED--------------------//
//--------------------------------------------------------------//

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'Success',
    data: { tour },
  });
};

//------------------------------------------------//
//---------------POST OPERATION-------------------//
//------------------------------------------------//
exports.createTour = (req, res) => {
  //   console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newID }, req.body);

  tours.push(newTours);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTours } });
    }
  );
};

//------------------------------------------------//
//----------------PATCH OPERATION-----------------//
//------------------------------------------------//

exports.updateTours = (req, res) => {
  res.status(200).json({ status: 'success', data: { tour: 'Updated Tour' } });
};

//---------------------------------------------------//
//-----------------DELETE OPERATION-----------------//
//--------------------------------------------------//
exports.deleteTours = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
