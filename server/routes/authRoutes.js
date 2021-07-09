const express = require("express");
const authRouter = express.Router();
const { register } = require('../controllers/auth');

authRouter.post("/register", register);


module.exports = authRouter;