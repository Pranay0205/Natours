const express = require('express');
const userControllers = require('./../controller/userController');
const router = express.Router();

router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUsers);

router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
