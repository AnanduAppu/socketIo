const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authmiddleware');
const ChatControll = require("../controllers/chatControllers")


router.route("/").post(protect,ChatControll.accessChat)








module.exports = router