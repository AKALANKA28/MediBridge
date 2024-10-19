const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");

exports.authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    // Check for the authorization header and extract the token
    if (req?.headers?.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    } else {
        return res.status(401).json({ message: "No token attached to the header" });
    }

    try {
        if (token) {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Fetch user from the database using the decoded ID
            const user = await User.findById(decoded?.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            req.user = user; // Attach user object to req
            next(); // Proceed to the next middleware
        } else {
            return res.status(401).json({ message: "Token not provided" });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized! Token expired or invalid. Please log in again.' });
    }
});

exports.isAdmin = asyncHandler(async (req, res, next) => {
    // Check if user exists in req
    if (!req.user) {
        return res.status(403).json({ message: "Access denied. No user data available." });
    }

    // Check if the user has admin role
    const adminUser = await User.findById(req.user._id); // Fetch user from the database
    if (!adminUser || adminUser.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized as an admin" });
    }

    next(); // User is an admin, proceed to the next middleware
});
