const Group = require("../models/group.model");
const User = require("../models/user.model");

const createGroup = async (req, res) => {
    const { name, members } = req.body;
    try {
        const newGroup = new Group({ name, members });
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ message: "Error creating group", error: error.message });
    }
};

const getGroups = async (req, res) => {
    try {
        const groups = await Group.find({ members: req.user._id }).populate("members");
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: "Error fetching groups", error: error.message });
    }
};

const addMember = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" });

        group.members.push(userId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: "Error adding member", error: error.message });
    }
};

const removeMember = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" });

        group.members.pull(userId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: "Error removing member", error: error.message });
    }
};

module.exports = { createGroup, getGroups, addMember, removeMember };
