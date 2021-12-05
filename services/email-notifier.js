const nodemailer = require("nodemailer");
const { mailgun } = require("../environment");

async function notify({ subject, body }) {
  const transporter = nodemailer.createTransport({
    service: "Mailgun",
    auth: {
      user: mailgun.user,
      pass: mailgun.pass,
    },
  });

  await transporter.sendMail({
    from: "Biscoint <contato@biscoint.com>", // sender address
    to: mailgun.email, // list of receivers
    subject, // Subject line
    text: body, // plain text body
    html: body, // html body
  });
}

exports.notify = notify;
