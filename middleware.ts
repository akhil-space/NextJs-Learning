
import { NextRequest, NextResponse } from "next/server";
// import middileware from 'next-auth/middleware'
export {default} from 'next-auth/middleware'
// export default middileware;



// export function middleware(request : NextRequest){


// return NextResponse.redirect(new URL('/login-page' ,request.url) );
// }

export const config = {
    //*: zero or more
    //+:oneor more
    //? : zero or one  
    matcher : [
        '/users/:id*'
    ]
}