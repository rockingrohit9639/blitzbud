const Manager = require("../db/Schema/manager");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Creating a jsonwebtoken
const maxage = 3 * 24 * 60 * 60;
const createWebToken = (id) =>
{
    return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: maxage });
}
