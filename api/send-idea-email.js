import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });

  const { name, phone, email, idea } = req.body; // 这里对应的字段是姓名、电话、邮箱、想法

  try {
    await resend.emails.send({
      from: 'Linkly Idea <contact@linklyai.net>',
      to: ['hkwaiic@gmail.com'],
      reply_to: email,
      subject: `💡 新创意征集: 来自 ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>收到新的场景创意！</h2>
          <p><strong>提交人:</strong> ${name}</p>
          <p><strong>电话:</strong> ${phone}</p>
          <p><strong>邮箱:</strong> ${email}</p>
          <div style="background: #f5f5f7; padding: 15px; border-radius: 8px;">
            <p><strong>创意描述:</strong></p>
            <p>${idea}</p>
          </div>
        </div>
      `,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: '发送失败' });
  }
}