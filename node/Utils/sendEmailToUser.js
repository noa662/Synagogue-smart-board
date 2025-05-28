const nodemailer = require("nodemailer");

async function sendEmailToUser(email, name) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shvavim.dev@gmail.com",
            pass: "flfj nbwy utxk dcxd"
        }
    });

    const mailOptions = {
        from: '"מערכת הפניות" <shvavim.dev@gmail.com>',
        to: email,
        subject: "הפנייה שלך התקבלה",
        text: `${name} שלום,\n\nהפנייה שלך התקבלה במערכת.\nנחזור אליך בהקדם.\n\nתודה.`
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmailToUser;