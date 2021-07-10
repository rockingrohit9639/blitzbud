const express = require("express");
const authRouter = express.Router();
const { login, register, auth, getManagers, deleteManager } = require('../controllers/auth');
const { authenticate } = require("../middlewares/authenticate");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/authenticate", authenticate, auth);
authRouter.get("/getmanagers", getManagers);
authRouter.post("/deletemanager", deleteManager);


module.exports = authRouter;