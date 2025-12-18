import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { contactEmail, contactPhone, lastName, firstName, address, paymentMethod, items, totalPrice } = req.body;

  // 格式化商品列表为 HTML
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.productName}</strong> (x${item.qty})<br>
        <small style="color: #666;">${item.config.materialName} / ${item.config.colorName}</small>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        CN¥ ${(item.price || 0).toFixed(2)}
      </td>
    </tr>
  `).join('');

  try {
    const data = await resend.emails.send({
      from: 'Linkly Order <contact@linklyai.net>',
      to: ['hkwaiic@gmail.com'], // 接收订单的邮箱
      reply_to: contactEmail,
      subject: `新订单: ${lastName}${firstName} - CN¥ ${totalPrice.toFixed(2)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="border-bottom: 2px solid #0071e3; padding-bottom: 10px;">收到新订单！</h2>
          
          <h3>客户信息</h3>
          <p><strong>姓名:</strong> ${lastName}${firstName}</p>
          <p><strong>联系电话:</strong> ${contactPhone}</p>
          <p><strong>联系邮箱:</strong> ${contactEmail}</p>
          <p><strong>预计支付方式:</strong> ${paymentMethod}</p>

          <h3>配送地址</h3>
          <p>${address.province} ${address.city} ${address.district}<br>${address.detail}</p>
          <p><strong>收货电话:</strong> ${address.shippingPhone}</p>

          <h3>订单详情</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f5f5f7;">
                <th style="text-align: left; padding: 10px;">项目</th>
                <th style="text-align: right; padding: 10px;">金额</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <h3 style="text-align: right; color: #0071e3;">总计: CN¥ ${totalPrice.toFixed(2)}</h3>
          
          <p style="margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 10px;">
            本邮件由 Linkly 官网结账系统自动发出。
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Order email error:', error);
    return res.status(500).json({ error: '订单发送失败，请稍后重试' });
  }
}