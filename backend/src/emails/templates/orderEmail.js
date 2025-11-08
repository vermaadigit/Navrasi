const baseTemplate = require("./baseTemplate");

module.exports = function orderEmail({ name, orderId, items, total }) {
  const LOGO_URL =
    "https://res.cloudinary.com/doerwhjp5/image/upload/v1762585351/Navrasi_Logo_Home_jkab9h.png"; // Put Navrasi Logo here

  const itemsList = items
    .map(
      (item) =>
        `
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:12px 10px; display:flex; gap:10px; align-items:center;">
            <img src="${
              item.image
            }" width="55" height="55" style="border-radius:8px; object-fit:cover;" />
            <div>
              <div style="font-weight:600; color:#111;">${item.title}</div>
              ${
                item.size || item.color
                  ? `
                <div style="font-size:13px; color:#666;">
                  ${item.size ? `Size: ${item.size}` : ""} 
                  ${item.color ? ` | Color: ${item.color}` : ""}
                </div>`
                  : ""
              }
            </div>
          </td>
          <td align="center" style="padding:12px 10px; font-size:15px;">${
            item.quantity
          }</td>
          <td align="right" style="padding:12px 10px; font-size:15px;">₹${
            item.price
          }</td>
        </tr>`
    )
    .join("");

  return baseTemplate({
    title: `Your Order is Confirmed 🎉`,
    content: `
      <div style="text-align:center; margin-bottom:25px;">
        <img src="${LOGO_URL}" alt="Navrasi Store" width="110" style="margin-bottom:10px;" />
        <h2 style="margin:0; font-size:24px; color:#111;">Navrasi Store</h2>
        <p style="font-size:14px; color:#666; margin-top:6px;">Premium Fashion • Fast Delivery • Easy Returns</p>
      </div>

      <p>Hi <strong>${name}</strong>,</p>
      <p style="font-size:15px; color:#333;">
        We're thrilled to let you know that your order <strong>#${orderId}</strong> has been successfully received and is now being processed.  
        We'll keep you posted on the shipping updates!
      </p>

      <div style="background:linear-gradient(to right,#fafafa,#f0f0f0); padding:16px 20px; border-radius:8px; margin:25px 0;">
        <div style="font-size:16px; font-weight:600; color:#111;">Order Details</div>
        <div style="font-size:14px; color:#555; margin-top:6px;">
          Order Number: <strong>${orderId}</strong><br/>
          Order Date: ${new Date().toLocaleDateString()}
        </div>
      </div>

      <h3 style="margin-top:25px; color:#111;">🧾 Items Summary</h3>
      <table width="100%" style="border-collapse:collapse; margin-top:10px; background:white;">
        <tr style="background:#fafafa; font-size:14px;">
          <th align="left" style="padding:10px;">Item</th>
          <th align="center" style="padding:10px;">Qty</th>
          <th align="right" style="padding:10px;">Price</th>
        </tr>
        ${itemsList}
      </table>

      <div style="margin-top:18px; font-size:17px; text-align:right; font-weight:600; color:#111;">
        Total: ₹${total}
      </div>

      <div style="text-align:center; margin:28px 0;">
        <a href="${process.env.FRONTEND_URL}/orders" 
          style="background:#111; color:white; padding:12px 22px; border-radius:6px; text-decoration:none; font-size:15px; display:inline-block;">
          View Order Status
        </a>
      </div>

      <p style="font-size:14px; color:#555;">
        As soon as your items are shipped, you'll receive another email with tracking details.
      </p>

      <hr style="margin:28px 0; border:none; border-top:1px solid #eee;" />

      <div style="text-align:center; font-size:13px; color:#666;">
        Follow us for updates & offers:
        <div style="margin-top:8px;">
          <a href="#" style="margin:0 6px; color:#111;">Instagram</a> |
          <a href="#" style="margin:0 6px; color:#111;">Facebook</a> |
          <a href="#" style="margin:0 6px; color:#111;">Twitter</a>
        </div>
      </div>
    `,
  });
};
