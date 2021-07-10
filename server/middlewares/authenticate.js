const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) =>
{
    const authHeader = req.headers.authorization;
    
    if (authHeader)
    {
        const token = authHeader.replace("Bearer ", "");
        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) =>
        {
            if (err)
            {
                return res.status(401).json({ error: "Invalid Token" });
            }

            req.userId = user.id;
            next();
        })
    }
    else
    {
        return res.status(401).json({ error: 'No AUTH HEADER' });
    }
}