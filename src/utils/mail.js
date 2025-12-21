import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com",
    },
  });

  // Generate email content
  const emailText = mailGenerator.generatePlaintext(
    options.mailgenContent
  );

  const emailHtml = mailGenerator.generate(
    options.mailgenContent
  );

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_TRAP_HOST,
    port: process.env.MAIL_TRAP_PORT,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    },
  });

  const mail = {
    from: "Task Manager <mail.taskmanager@example.com>",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
    console.log("📧 Email sent successfully");
  } catch (error) {
    console.error(
      "❌ Email service failed. Check Mailtrap credentials in .env"
    );
    console.error(error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to Task Manager 👋",
      action: {
        instruction: "To verify your email, please click the button below:",
        button: {
          color: "#1eea5e",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro: "Need help? Just reply to this email.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "You requested to reset your password",
      action: {
        instruction: "Click the button below to reset your password:",
        button: {
          color: "#1eea5e",
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro: "If you didn’t request this, you can safely ignore this email.",
    },
  };
};

export {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
};
