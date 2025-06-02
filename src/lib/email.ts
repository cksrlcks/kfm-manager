import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: process.env.NODE_MAIL_SERVICE,
  host: process.env.NODE_MAIL_HOST,
  port: Number(process.env.NODE_MAIL_PORT),
  auth: {
    user: process.env.NODE_MAIL_USER,
    pass: process.env.NODE_MAIL_PASSWORD,
  },
});

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  try {
    await transporter.sendMail({
      from: process.env.NODE_MAIL_FROM,
      to: email,
      subject: "KFM Manager 비밀번호 재설정 메일",
      text: "KFM Manager 비밀번호 재설정 메일",
      html: `
        <p>비밀번호 재설정 링크입니다. : <a href="${resetLink}" target="_blank">비밀번호 재설정</a></p>
      `,
    });
  } catch (error) {
    console.error("메일 전송 중 오류 발생:", error);
    throw new Error("메일 전송 실패");
  }
}
