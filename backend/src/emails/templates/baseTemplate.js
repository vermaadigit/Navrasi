module.exports = function baseTemplate({ title, content }) {
  return `
  <div style="font-family: 'Segoe UI', sans-serif; background:#f4f4f7; padding:30px;">
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 3px 10px rgba(0,0,0,0.1);">
      
      <div style="padding:20px 30px; background:#ffffff; border-bottom:1px solid #eee;">
        <h2 style="margin:0; font-size:22px; color:#111;">${title}</h2>
      </div>

      <div style="padding:30px; font-size:16px; color:#333; line-height:1.6;">
        ${content}
      </div>

      <div style="background:#fafafa; padding:18px; text-align:center; font-size:13px; color:#777; border-top:1px solid #eee;">
        © ${new Date().getFullYear()} Navrasi Store. All rights reserved.
      </div>

    </div>
  </div>`;
};
