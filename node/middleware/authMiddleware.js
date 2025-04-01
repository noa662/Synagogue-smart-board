const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const autoMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Access denied" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).json({ massage: "Invalid token" });
    };
};

module.exports = autoMiddleware;