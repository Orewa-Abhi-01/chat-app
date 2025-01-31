const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser")

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,  //calc milliseconds in a day
        httpOnly: true, //prevents access from javascript code , xss attacks cross site scripting
        sameSite: "strict",//csrf attacks cross-site request forgery attack
        // secure: process.env.NODE_ENV === "development" ? false : true,
        secure: process.env.NODE_ENV !== "development",
    })
    return token;
}

module.exports = {
    generateToken,
}