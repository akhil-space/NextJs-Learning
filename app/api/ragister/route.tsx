import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import bcrypt from 'bcrypt';
import prisma from "@/prisma/client";
import { sendEmail } from "@/helper/mailer";

const schema = z.object({
email: z.string().email(),
password : z.string().min(4),
});


export async function POST(request : NextRequest){
  const  body  = await request.json();
 const validation = schema.safeParse(body);
if(!validation.success)
    return NextResponse.json({ error : validation.error.errors} , {status: 400})
const user =await prisma.user.findUnique({
    where :{
        email: body.email
    }
})

if(user)
    return NextResponse.json({message : "User Already exist!! please login..."}, {status: 400})

const hashedPassword = await bcrypt.hash(body.password, 10);

const newUser =  await prisma.user.create({
    data:{
        email: body.email,
        hashpassword: hashedPassword
    }
});

const mailresponse = await sendEmail({
    email:body.email,
    emailType:'VERIFY',
    userid : newUser.email
} )

    return NextResponse.json({ message : "User created succsesfully",
        email: body.email,
        verification:"email verification sent"
    });
}