const express = require("express");
const router = express.Router();
const {signup}  = require("../controllers/signup");
const {login,logout} = require("../controllers/login");



router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout);




module.exports = router;