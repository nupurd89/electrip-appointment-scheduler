const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const carType = req.body.carType;
  const licensePlate = req.body.licensePlate;
  const carColor = req.body.carColor;
  const newUser = new User({
    username,
    email,
    phone,
    carType,
    licensePlate,
    carColor,
  });
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
