const mg = require("./mailgun.config");
require("dotenv").config();

/**
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML email content
 */
async function sendEmail(to, subject, html) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Navrasi Store <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      to,
      subject,
      html,
    });

    console.log(`📨 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
}

module.exports = sendEmail;
