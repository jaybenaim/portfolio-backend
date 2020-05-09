const validateEmail = require("../validators/email");
require("dotenv").config();

// sendGrid setup
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (req, res) => {
  // Validation
  const { errors, isValid } = validateEmail(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    //    If validated send email
    const { name, email, message } = req.body;
    let html = `<div>${message} <br /> from ${name} - ${email}</div>`;
    let subject = `Portfolio Contact - ${name}`;
    const msg = {
      to: "benaimjacob@gmail.com",
      from: email,
      subject,
      text: message,
      html,
    };
    sgMail
      .send(msg)
      .then((res) => {
        return res.status(200).send(res);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
    return res.send({ name, email, message });
  }
};

module.exports = { sendEmail };
