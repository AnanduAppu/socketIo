const express = require('express');
const router = express.Router();
const userControll = require("../controllers/Usercontrollers");
const { protect } = require('../middlewares/authmiddleware');


// router.route('/login').get()
router.route('/registration').post(userControll.registration)
router.route('/login').post( userControll.loginUser)
router.route('/users').get(protect,userControll.allUsers)

module.exports = router;
