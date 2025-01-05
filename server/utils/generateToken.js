const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config/kyes");

const generateToken = (user)=>{
    const token = jwt.sign(
      {
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
      },
      jwtSecret,
      {
        expiresIn: "7d", // means the token will expires in 7 days.
      }
    )
    return token;;
};
module.exports = generateToken;
