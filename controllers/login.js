const User = require("../models/User");
const bcrypt = require("bcrypt");
const session = require("express-session");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      msg: "Please fill all the fields",
    });
  }

  const user = await User.findOne({ username });

  var error = [];
  if (!user){
        
  }


  

  try {
    if (!user) {
    //   return res.json({ message: "Invalid username or password" });
    error.push(
        {
          errorField : "login",
          msg : "not valid username"
        }
    ) 
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    //   return res.json({ message: "Invalid username or password" });
    error.push(
        {
          errorField : "login",
          msg : "not valid  password"
        }
    ) 
    }
    if (error.length > 0) {
        console.log(error)
        return res.json({
          error : true,
          errorData : error
        })
      }
    req.session.user = { id: user._id, username: user.username };
    res.json({
      success: true,
      redirectUrl: "/home",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ message: "Logout failed" });
    }
    res.json({ message: "Logged out successfully" });
  });
};

module.exports = { login, logout };
