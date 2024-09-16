const express = require("express");
const app = express();


const renderHome = (req,res) => {
    res.render('home');
  
};

module.exports = {
    renderHome
};