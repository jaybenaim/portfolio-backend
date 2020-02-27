const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./queries");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors());

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

process.on("warning", e => console.warn(e.stack));

app.post("/email", (req, res, next) => {
  const { name, email, message } = req.body;
  let html = `<div>${message} <br /> from ${name}</div>`;
  let subject = `Portfolio Contact - ${name}`;
  const msg = {
    to: "benaimjacob@gmail.com",
    from: email,
    subject,
    text: message,
    html
  };
  sgMail
    .send(msg)
    .then(res => {
      console.log("Success");
    })
    .catch(err => {
      console.log("Error", err);
    });
  res.send({ name, email, message });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
