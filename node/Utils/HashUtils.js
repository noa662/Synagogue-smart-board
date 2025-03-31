const bcrypt = require("bcrypt");

//פונקציה להצפנת סיסמה
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

//פונקציה להשוואת סיסמה
async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };
