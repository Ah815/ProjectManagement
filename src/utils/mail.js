import Mailgen from 'mailgen-js';
import nodemailer from 'nodemialer'


const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext
        (options.mailgenConten)

    const emailHtml = mailGenerator.generatePlaintext
        (options.mailgenConten)



    const transpoter = nodemailer.createTransport({
        host: process.env.MAIL_TRAP_HOST,
        port: process.env.MAIL_TRAP_PORT,
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASS,
        }
    })

    const mail ={
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }

    try {
await transpoter.sendMail(mail)
    }   catch (error) {
console.error("Error services failed siliently. Make sure that you have provided your MAILTRAP crendiatils i the .env file")
console.error("Error", error)
    }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "welcome to app",
            action: {
                instruction: "to verify the email please click on the following button",
                button: {
                    color: "#1eea5e",
                    text: "verify your email",
                    link: verificationUrl
                }
            },
            outro: "need help so reply on the mail"

        }
    }
}

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "request to change password",
            action: {
                instruction: "to reset password click on the following button",
                button: {
                    color: "#1eea5e",
                    text: "reset password",
                    link: passwordResetUrl
                }
            },
            outro: "need help so reply on the mail"

        }
    }
}

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}