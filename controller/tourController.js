/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

const Tour = require('../models/tourModels');

//------------------------------------------------//
//----------PARSING JSON FILE INTO ARRAY----------//
//------------------------------------------------//

// exports.checkID = (req, res, next, val) => {
// 	console.log(`Tour id is: ${val}`);

// 	if (req.params.id * 1 > tours.length) {
// 		return res.status(404).json({
// 			status: 'fail',
// 			message: 'Invalid ID'
// 		});
// 	}
// 	next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'Success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

//----------------------------------------------------------------//
//---------------GET OPERATION AND ID DEFINED--------------------//
//--------------------------------------------------------------//

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); // Tour.findOne({_id: req.params.id}) alernate way

    res.status(200).json({
      status: 'Success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      data: err,
    });
  }
};

//------------------------------------------------//
//---------------POST OPERATION-------------------//
//------------------------------------------------//
exports.createTour = async (req, res) => {
  //   console.log(req.body);
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Invalid Data Sent!',
    });
  }
};
//------------------------------------------------//
//----------------PATCH OPERATION-----------------//
//------------------------------------------------//

exports.updateTours = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); //updateOne({ _id: req.params.id });

    res.status(200).json({ status: 'success', data: { tour } });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

//---------------------------------------------------//
//-----------------DELETE OPERATION-----------------//
//--------------------------------------------------//
exports.deleteTours = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(404).json({ status: 'Fail', message: 'failed to delete' });
  }
};
