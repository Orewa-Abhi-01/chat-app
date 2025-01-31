const mongoose = require('mongoose');
const Message = require('../models/messageModels'); // Adjust the path as needed

const updateMessages = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/chatapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const messages = await Message.find({ messageTimestamp: { $exists: false } });

    for (const message of messages) {
      message.messageTimestamp = new Date(); // Or any other logic to set the timestamp
      await message.save();
    }

    console.log('Messages updated successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating messages:', error);
    mongoose.disconnect();
  }
};

updateMessages();