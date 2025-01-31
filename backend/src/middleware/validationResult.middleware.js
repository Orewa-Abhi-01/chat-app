const { body, param, validationResult } = require("express-validator");

// Middleware to validate group creation
const validateCreateGroup = [
    body("name")
        .notEmpty().withMessage("Group name is required")
        .isString().withMessage("Group name must be a string")
        .trim(),
    body("members")
        .isArray().withMessage("Members must be an array")
        .notEmpty().withMessage("At least one member is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Middleware to validate group ID
const validateGroupId = [
    param("groupId").isMongoId().withMessage("Invalid group ID"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Middleware to validate add/remove member
// Middleware to validate adding/removing members
const validateAddRemoveMember = [
    body("userId")
        .isMongoId().withMessage("Invalid user ID format")
        .notEmpty().withMessage("User ID is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];


module.exports = { validateCreateGroup, validateGroupId, validateAddRemoveMember
    }