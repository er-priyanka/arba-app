const express = require('express');
const { UserController } = require('../Controllers/user.controller');

const userRoute = express.Router();

// register user
userRoute.post('/register', UserController.register);

// login user
userRoute.post('/login', UserController.login);

// get user profile
userRoute.get('/profile', UserController.getProfile);

// update user profile
userRoute.patch('/profile', UserController.updateProfile);

// change password
userRoute.patch('/change-password', UserController.changePassword);

// logout user
userRoute.post('/logout', UserController.logout);


module.exports = { userRoute };