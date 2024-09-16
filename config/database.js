// instance of mongoose
const mongoose = require("mongoose");

require("dotenv").config();

// connection between appliction and data base
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connection is successfull")
    )
    .catch((error) => {
        console.log("issue in DB Connection");
        console.error(error.message);
        process.exit(1);      
    })
}

module.exports = dbConnect;