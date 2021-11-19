const nodemailer = require("nodemailer");
const { mailgunUser, mailgunPass, mailgunEmail } = require("../environment");

function toCapitalize(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

async function notifyError(params) {
  const transporter = nodemailer.createTransport({
    service: "Mailgun",
    auth: {
      user: mailgunUser,
      pass: mailgunPass,
    },
  });

  const html = Object.keys(params)
    .map(
      (key) => `<p><strong>${toCapitalize(key)}</strong>: ${params[key]}</p>`
    )
    .join("");

  await transporter.sendMail({
    from: "Biscoint <contato@biscoint.com>", // sender address
    to: mailgunEmail, // list of receivers
    subject: "[ERROR] Biscoint - Compra Programada", // Subject line
    text: JSON.stringify(params), // plain text body
    html,
  });
}

exports.notifyError = notifyError;
