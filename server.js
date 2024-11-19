const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

require("dotenv").config();

const emailPass = process.env.PASSWORD;

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "a.mohamed01479@gmail.com",
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: email,
      to: "a.mohamed01479@gmail.com",
      subject: `Message from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
