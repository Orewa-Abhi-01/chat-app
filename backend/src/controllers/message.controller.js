const User = require("../models/user.model.js");
const Message = require("../models/messageModels.js");

const {cloudinary} = require("../lib/cloudinary.js");

const {getReceiverSocketId,  io } = require("../lib/socket.js");

// get users for message bar/sidebar
const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
    // console.log("filteredUsers", filteredUsers);
  } catch (error) {
    console.log("error in getUsersForSideBar controller : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

// getMessages between two users
const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessages controller : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    // console.log("receiverId", receiverId);
    const senderId = req.user._id;

    if (!receiverId || !senderId) {
      return res.status(400).json({ message: "Invalid request sender and receiver ids are required" });
    }

    let imageUrl;
    if (image) {
      // console.log("image", image);
      //upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      // console.log("uploadResponse", uploadResponse);
      imageUrl = uploadResponse.secure_url;
      // console.log("imageUrl", imageUrl);
    }
    const newMessage = new Message({
       senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //  To-do: relatime functionality goes here (socket.io)
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //this will emit event to receiver only, not in group cause its a private chat
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

//recently added in the project
const getLastMessagesForEachUser = async (req, res) => {
  try {
    const myId = req.user._id;

    const lastMessages = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: myId },
            { receiverId: myId }
          ]
        }
      },
      {
        $sort: { messageTimestamp: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", myId] },
              "$receiverId",
              "$senderId"
            ]
          },
          lastMessage: { $first: "$$ROOT" }
        }
      }, {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          userName: "$user.fullName",
          userProfilePic: "$user.profilePic",
          lastMessage: 1
        }
      }
    ]);

    res.status(200).json(lastMessages);
  } catch (error) {
    console.log("error in getLastMessagesForEachUser controller: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const message = await Message.findByIdAndDelete(messageId);
    console.log("deleted message", message);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Emit a WebSocket event 
    req.app.get('socketio').emit('messageDeleted', messageId);


    // await message.remove();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: error.message });
  }
};

const forwardMessage = async (req, res) => {
  const { messageId, receiverId } = req.body; // Get message ID and receiver ID from request body
  try {
    const originalMessage = await Message.findById(messageId);
    if (!originalMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    const newMessage = new Message({
      senderId: req.user._id,
      receiverId: receiverId,
      text: originalMessage.text,
      image: originalMessage.image,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error forwarding message:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports = { getUsersForSideBar, getMessages, sendMessage, getLastMessagesForEachUser, deleteMessage, forwardMessage };
