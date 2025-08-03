const {signup , login} = require("../controllers/authController");
const express = require('express');
const router = express();
router.post('/signup' , signup);
router.post('/login' , login);
module.exports = router