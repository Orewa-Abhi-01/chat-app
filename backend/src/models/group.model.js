const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    groupType: {
        type: String,
        enum: ["public", "private"],
        default: "public",
    },
}, {
    timestamps: true,
});

// groupSchema.index({ name: 1 });

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;