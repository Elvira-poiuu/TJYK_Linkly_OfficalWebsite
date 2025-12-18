import { Resend } from 'resend';

// 初始化 Resend，这里的 process.env.RESEND_API_KEY 是我们在 Vercel 网页上设置的密码
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 1. 检查是不是 POST 请求（也就是提交表单的动作）
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允许 POST 请求' });
  }

  // 2. 从前端传来的数据中获取信息
  const { name, email, topic, message } = req.body;

  try {
    // 3. 使用 Resend 发送邮件
    const data = await resend.emails.send({
      from: 'Linkly Website <noreply@send.linklyai.net>', 
      to: ['contact@linklyai.net'], 

      reply_to: email, // 这样你直接点回复，就是回复给填表的用户
      subject: `新咨询: ${name} - ${topic}`, // 邮件标题
      html: `
        <h2>收到新的网站咨询</h2>
        <p><strong>姓名:</strong> ${name}</p>
        <p><strong>用户邮箱:</strong> ${email}</p>
        <p><strong>感兴趣的话题:</strong> ${topic}</p>
        <p><strong>留言内容:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #0071e3;">
          ${message || '无留言'}
        </blockquote>
      `,
    });

    // 4. 发送成功，告诉前端“OK”
    return res.status(200).json({ success: true, data });
  } catch (error) {
    // 5. 发送失败，打印错误
    console.error('邮件发送失败:', error);
    return res.status(500).json({ error: '发送失败，请稍后重试' });
  }
}