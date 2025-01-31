

const express = require("express");
const { createGroup, getGroups, addMember, removeMember } = require("../controllers/group.controller");
const { protectRoute } = require("../middleware/auth.middleware");
const { validateCreateGroup, validateGroupId, validateAddRemoveMember } = require("../middleware/validationResult.middleware");

const router = express.Router();

/**
 * @route   POST /api/groups
 * @desc    Create a new group
 * @access  Private
 */
router.post("/", protectRoute, validateCreateGroup, createGroup);

/**
 * @route   GET /api/groups
 * @desc    Get all groups
 * @access  Private
 */
router.get("/", protectRoute, getGroups);

/**
 * @route   PUT /api/groups/add-member/:groupId
 * @desc    Add a member to a group
 * @access  Private
 */
router.put("/add-member/:groupId", protectRoute, validateGroupId, validateAddRemoveMember, addMember);

/**
 * @route   PUT /api/groups/remove-member/:groupId
 * @desc    Remove a member from a group
 * @access  Private
 */
router.put("/remove-member/:groupId", protectRoute, validateGroupId, validateAddRemoveMember, removeMember);

module.exports = router;