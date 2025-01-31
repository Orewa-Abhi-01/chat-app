const express = require("express");
const { protectRoute } = require("../middleware/auth.middleware.js");
const {
  getUsersForSideBar,
  getMessages,
  sendMessage,
  getLastMessagesForEachUser,
  deleteMessage,
  
} = require("../controllers/message.controller.js");

// const { getMessages, createMessage, deleteMessage, updateMessage } = require("../controllers/message.controllers.js");

const router = express.Router();


// Last messages for each user  (recently added in the project)
router.get("/last-messages", protectRoute, getLastMessagesForEachUser);

//sidebar users
router.get("/users", protectRoute, getUsersForSideBar);

//messages between two users
router.get("/:id", protectRoute, getMessages);

//send message dynamically for each user
router.post("/send/:id", protectRoute, sendMessage);

// // Last messages for each user
// router.get("/last-messages", protectRoute, getLastMessagesForEachUser);

//delete message
router.delete("/:id", protectRoute, deleteMessage);

//forward message
// router.post("/forward/:messageId", protectRoute, forwardMessage);
module.exports = router;
