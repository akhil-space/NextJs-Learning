'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";


const NavBar = ()=>{


    const  { status , data: session}=useSession();
// if(status ==='loading') return null;

    return <div className="flex bg-slate-200 p-5 space-x-5">
<Link href="/" className="mr-5"> Next.Js</Link>
<Link href="/users"> user</Link>

{
    status ==='loading' && <div> Loading ...</div>
}
{
    status ==='authenticated' && <div> {session.user?.name || session.user?.email}
    <Link href={'/api/auth/signout'} className="ml-5">logout</Link>
    </div>
}
{
    status ==='unauthenticated' && <Link href="/api/auth/signin"> Login</Link>

}

<Link href={'api/auth/token'}> getToken</Link>
    </div>
}

export default NavBar;