// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();
// const User = require("../models/userModel");

// const generateToken = async (userId, res) => {
//     try {
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       const accessToken = jwt.sign(
//         { name: user.name, email: user.email },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );
//       return res.json({ accessToken });
//     } catch (err) {
//       console.error('Error generating token:', err);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };  

// module.exports = { generateToken };

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/userModel");

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = jwt.sign(
      { id: user._id, name: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return accessToken;
  } catch (err) {
    console.error("Error generating token:", err);
    throw err;
  }
};

module.exports = { generateToken };
