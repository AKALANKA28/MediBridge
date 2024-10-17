const express = require('express');
const router = express.Router();

const userController = require("../controller/authController");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

// USER ROUTES
router.post('/register', userController.registerUser);                         // User registration
router.post('/login', userController.loginController);                         // User login
router.post('/admin-login', userController.loginAdmin);                        // Admin login
router.post("/forgot-password-token", userController.forgotPasswordToken);     // Forgot password
router.put("/password", authMiddleware, userController.updatePassword);        // Update user password
router.put('/reset-password/:token', userController.resetPassword);            // Reset password
router.get("/refresh", userController.handleRefreshToken);                     // Refresh JWT
router.get("/logout", userController.logout);                                  // User logout
router.get('/', userController.getAllUsers);                                   // Get all users (admin)
router.get("/get/:id", authMiddleware, userController.getUserById);            // Get user by ID
router.put("/update/:id", authMiddleware, userController.updatedUser);         // Update user profile
// router.put("/block/:id", authMiddleware, isAdmin, userController.blockUser);   // Block user (admin)
// router.put("/unblock/:id", authMiddleware, isAdmin, userController.unblockUser); // Unblock user (admin)
router.delete("/delete/:id",authMiddleware, userController.deleteUser); 

module.exports = router;
