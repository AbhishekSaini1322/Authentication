const express = require("express");
const es6Renderer = require('express-es6-template-engine')
const app = express();

// load config from env file
const PORT = process.env.PORT || 4000;
var session = require('express-session')

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
// middleware to parse json request body
app.use(express.json());

// import routes for todo api


// mount the todo aspi routes
const baseRoutes = require("./routes/index")
const apiRoutes = require("./routes/api"); 
const accountsRoute = require("./routes/account")
app.use("/", baseRoutes);
app.use("/api/v2", apiRoutes);
app.use("/accounts", accountsRoute);

// connect to the database
const dbConnect = require("./config/database");
dbConnect();


function authenticate(req,res, next) {
    if (req.session.user) {
        next()
    }
    else{
      res.redirect("login")
      res.end()
    }
}


// default route
app.get("/",(req,res)=>{
  res.redirect('/accounts/login');
})

app.listen(PORT, () => {
  console.log(`server started at port successfully run at ${PORT}`);
})








