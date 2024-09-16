// import model
const users = require("../models/User");
const bcrypt = require("bcrypt")

module.exports.signup = async (req, res) => {
  const { username, email, password , fullName} = req.body;
  
  // Validate the request body
  if (!username || !email || !password ) {
    return res
    .json({
       msg: "Please fill all the fields" 
      });
  }
  // ----------- EMAIL REGEX ------------------
  var flags = "gm";
  const emailRegex = "[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}"
  const emailPattern = new RegExp(emailRegex, flags);
  var error = []
  if (email) {
    if(!email.match(emailPattern)){
      error.push(
        {
          errorField : "email",
          msg : "not valid email"
        }
      )
    }
  }

//  ----------- username REGEX ------------------
// const flags = "gm";
const usernameRegex = "^[A-Za-z][A-Za-z0-9_]{7,29}$"
const usernamePattern = new RegExp(usernameRegex, flags);

if (username) {
  if(!username.match(usernamePattern)){
    error.push(
      {
        errorField : "username",
        msg : "not valid username"
      }
    )
  }
}

// ---------- PASSWORD REGEX ---------------
const passwordRegex = /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const passwordPattern = new RegExp(passwordRegex, flags);
if (password) {
  if(!passwordRegex.test(password)){
    error.push(
      {
        errorField : "password",
        msg : "not valid password"
      }
    )
  }
}

if (error.length > 0) {
  console.log(error)
  return res.json({
    error : true,
    errorData : error
  })
}
// ------------------------------


  // Check if  already exists
  const userExists = await users.find({email : email}).exec();
  if (userExists.length) {
    return res
    .json({ msg: "User already exists" });
    
  }

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create the new user object
    const newUser = {
      id: users.length + 1,
      username,
      email,
      fullName,   
      password: hashedPassword,
    };

    await users.create(newUser)
    res.json({
      success :true,
      redirectUrl : "/accounts/login"
    })
    
  } catch (error) {
    console.error(error);
    res.json(error)
  }

  // return res.json({todo,msg:"Successfull"});
};
