const express = require("express")
const router = express.Router()
const { renderHome } = require("../controllers/home")


router.get("/home",renderHome)

module.exports  = router

