const User = require("../db/Schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Roles } = require("../constants");

// Creating a jsonwebtoken
const maxage = 3 * 24 * 60 * 60;
const createWebToken = (id) =>
{
    return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: maxage });
}

exports.login = async (req, res) =>
{
    const { email, password } = req.body;

    try
    {
        const user = await User.findOne({ email: email });

        if (user)
        {
            if (password === user.password)
            {
                const token = createWebToken(user._id);
                return res.status(200).json({ token, role: user.role });
            }
            else
            {
                return res.status(404).json({ error: 'Invalid Credentials' })
            }
        }
        else
        {
            return res.status(404).json({ error: 'No user found' })
        }

    }
    catch (err)
    {
        console.log(err)
        return res.status(500).json({ error: '500 Internal Error' });
    }
}

exports.register = async (req, res) =>
{
    let { fname, uname, contactno, email, password } = req.body;

    try
    {

        const isExist = await User.findOne({ email: email });

        if (!isExist)
        {
            const newUser = User.create({
                fname,
                uname,
                contactno,
                email,
                role: Roles.MANAGER,
                password,
            })

            const token = createWebToken(newUser._id);
            return res.status(200).json({ token });
        }
        else
        {
            return res.status(400).json({ "error": "Email Already Exists" })
        }

    }
    catch (err)
    {
        console.log(err);
        return res.status(500).json({ "error": "Internal Server Error" })
    }
}

exports.auth = async (req, res) =>
{
    const { userId } = req;

    try
    {

        const user = await User.findOne({ _id: userId });
        return res.status(200).json(user);
    }
    catch (err)
    {
        return res.status(500).json({ "error": "Internal Server Error" })
    }

}

exports.getManagers = async (req, res) =>
{

    try
    {
        const managers = await User.find({ role: "MANAGER" });
        return res.status(200).json(managers)
    }
    catch (err)
    {
        return res.status(500).json({ "error": "Internal Server Error" })
    }

}

exports.deleteManager = async (req, res) =>
{
    const { id } = req.body;

    if (!id)
    {
        return res.status(404).json({ "error": "Please provide a valid id." });
    }
    try
    {

        const isDeleted = await User.deleteOne({ _id: id });

        if (isDeleted)
        {
            return res.status(200).json({ "message": "Manager Deleted Successfully." });
        }

        return res.status(404).json({ "error": "No manager found with this id." });
    }
    catch (err)
    {
        console.log(err)
    }
}