import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });

  const { name, phone, email, quantity, usage, usageNote, features, featureNote } = req.body;

  try {
    await resend.emails.send({
      from: 'Linkly Customization <contact@linklyai.net>',
      to: ['hkwaiic@gmail.com'],
      reply_to: email,
      subject: `🛠️ 新定制需求单: 来自 ${name} (${quantity}套)`,
      html: `
        <div style="font-family: -apple-system, sans-serif; padding: 30px; color: #1d1d1f; background-color: #f5f5f7;">
          <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <h2 style="font-size: 24px; border-bottom: 1px solid #eee; padding-bottom: 20px;">收到新的定制方案预约</h2>
            
            <div style="margin: 20px 0;">
              <p><strong>客户姓名:</strong> ${name}</p>
              <p><strong>联系方式:</strong> ${phone}</p>
              <p><strong>电子邮箱:</strong> ${email}</p>
              <p><strong>预计定制数量:</strong> <span style="font-size: 18px; color: #0071e3; font-weight: bold;">${quantity} 套</span></p>
            </div>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 12px; margin-top: 20px;">
              <p><strong>定制用途:</strong> ${usage}</p>
              <p><strong>用途补充:</strong> ${usageNote || '无'}</p>
            </div>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 12px; margin-top: 20px;">
              <p><strong>选中的功能模块:</strong></p>
              <p style="color: #424245; line-height: 1.6;">${features || '未在列表选择'}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">
              <p><strong>补充需求描述:</strong></p>
              <p style="font-style: italic; color: #424245;">${featureNote || '无'}</p>
            </div>

            <p style="margin-top: 30px; font-size: 12px; color: #86868b;">这是来自 Linkly 官网定制系统的自动提醒。</p>
          </div>
        </div>
      `,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email Send Error:', error);
    return res.status(500).json({ error: '发送失败' });
  }
}