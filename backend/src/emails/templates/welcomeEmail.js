const baseTemplate = require("./baseTemplate");
require("dotenv").config();

module.exports = function welcomeEmail(name) {
  return baseTemplate({
    title: `Welcome to Navrasi Store 🎉`,
    content: `
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for creating an account with <strong>Navrasi Store</strong>. We're excited to have you onboard!</p>
      <p>Start exploring the latest premium trends now.</p>
      <br/>
      <a href="${process.env.FRONTEND_URL}" 
        style="padding:12px 20px; background:#111; color:white; text-decoration:none; border-radius:6px; font-size:15px;">
        Visit Store
      </a>
      <br/><br/>
      <p>If you didn’t create an account, you can ignore this email.</p>
    `,
  });
};
