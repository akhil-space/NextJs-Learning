import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"
import schema from "./schema";

export const GET = async (request: NextRequest) => {
    try {
        const users = await prisma.user.findMany();
        //    console.log("all users : ", users);

        if (!users) return NextResponse.json({ error: "not reachable" }, { status: 400 })
        return NextResponse.json(
            users
        )
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 })
    }

}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validate = schema.safeParse(body);
        if (!validate.success) return NextResponse.json(validate.error.errors, { status: 400 })

        // console.log(validate , "   : ", body);
        const isExist = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (isExist) return NextResponse.json({
            error: "User Already Exist... ",
        },
            { status: 403 })


        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                website: body.website
            }
        })


        //    if(!body.name) return NextResponse.json( {error : "Name is required!!"} ,{status: 400} )
        return NextResponse.json(user, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 })
    }
}