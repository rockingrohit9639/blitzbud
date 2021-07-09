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

exports.register = async (req, res) =>
{
    let { fname, uname, contactno, email, password } = req.body;
    // console.log(fname, uname, contactno, email, password);

    try
    {

        const isExist = await User.findOne({ email: email });
        
        console.log(isExist);

        if (!isExist)
        {
            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);

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
