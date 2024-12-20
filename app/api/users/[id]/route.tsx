import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";
// interface Props{
//     params:{ id : number}
// }
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const isExist = await prisma.user.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })
        if (!isExist) return NextResponse.json({
            error: "Invalid User",
        },
            { status: 400 })


        return NextResponse.json(isExist);
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 })
    }
}


// export async function POST( request: NextRequest){
//     const body=await request.json();
//     const validate =  schema.safeParse(body);
//      if(!validate.success) return NextResponse.json( validate.error.errors ,{status: 400} )

// //    if(!body.name) return NextResponse.json( {error : "Name is required!!"} ,{status: 400} )
//        return NextResponse.json(  {id : 1, body: body} ,{status: 201})
//    }

//Use PUT --replacing obj || PATCH   -- updating one or more properties
export async function PUT(request: NextRequest
    ,
    { params }: { params: { id: string } }) {

    //Validate The request body 
    //if invalid , return 400
    //Fetch the user with the given id 
    //if doesn't exist , return 404 not found
    // Update the user 
    // Return the Updated user

    try {
        const body = await request.json();
        const validate = schema.safeParse(body);
        if (!validate.success) return NextResponse.json(validate.error.errors, { status: 400 })

        const isExist = await prisma.user.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })
        if (!isExist) return NextResponse.json({
            error: "Invalid User",
        },
            { status: 400 })

        const UpdatedUser = await prisma.user.update(
            {
                where: {
                    id: isExist.id,
                },
                data: {
                    name: body.name,
                    email: body.email,
                    website: body.website
                }
            }
        );


        return NextResponse.json(UpdatedUser, { status: 201 })

    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 })
    }

}


export async function DELETE(request: NextRequest,
    { params }: { params: { id: string } }
) {
    //Fetch User From db
    //if not found , return 404
    //Delete user
    //return 200
    try {

        const isExist = await prisma.user.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })
        if (!isExist) return NextResponse.json({
            error: "Invalid User",
        },
            { status: 400 })

        await prisma.user.delete({
            where: {
                id: isExist.id
            }
        })


        return NextResponse.json({ res: "User Deleted" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 })
    }
}
