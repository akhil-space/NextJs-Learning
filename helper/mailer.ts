import nodemailer from 'nodemailer';
import prisma from '@/prisma/client';
import bcrypt from 'bcrypt'
import { string } from 'zod';
export const sendEmail = async ({ email, emailType, userid }: any) => { //any for time beings we have to change it

    try {
        console.log("step first");

        const hashedToken = await bcrypt.hash(userid.toString(), 10);
        console.log("second");
        if (emailType === 'VERIFY') {
            // const user = await prisma.user.findUnique({
            //     where: {
            //         id: email
            //     }
            // })

            await prisma.verificationToken.create({
                data: {
                    identifier: email, // Use the email or user ID as identifier
                    token: hashedToken,
                    expires: new Date(Date.now() + 3600000),// 1 hour expiration
                }
            })
            console.log("step third");
        } else if (emailType === 'RESET') {
            const user = await prisma.verificationToken.findUnique({
                where: {
                    identifier: email
                }
            })


            if (!user) {
                return null;
            }

            await prisma.verificationToken.update({
                where: {
                    identifier: email
                },
                data: {
                    token: hashedToken,
                    expires: new Date(Date.now() + 3600000),// 1 hour expiration 
                }
            })
        }

        console.log("step fourth");
        const transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // 587true for port 465, false for other ports
            auth: {
                user: process.env.GMAIL_SENDER,
                pass: process.env.GMAIL_SECURETY_KEY,
            },
        });

        console.log("step fifth");


        const mailOptions = {
            from: 'akhilspace07@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
           or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
           </p>`
        }

        console.log("step sixth");
        // send mail with defined transport object
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", mailResponse.messageId);

        return mailResponse;
    } catch (err) {
        console.log("Error occer ");

        console.log(err);

    }
}

