const express = require("express");
const { signup, login, logout, updateProfile, checkAuth } = require("../controllers/auth.controllers.js");
const { protectRoute } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello from auth route");
})

router.post('/signup',signup);

router.post('/login', login);

router.post('/logout', logout);

router.put('/update-profile', protectRoute,  updateProfile); //giving access to only authenticated users

router.get('/check', protectRoute, checkAuth); // providing user  who are authenticated || checking if user is authenticated


module.exports = router;