
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
// import UploadFile from "./upload/page";

export default async function Home() {


  const session = await getServerSession(authOptions);
  return (
   <main> 
    <h3> Hello  {session && <span>{session.user!.name || session.user?.email}</span>}</h3>
   <br />
   <Link href="users"> users </Link>
   {/* <UploadFile/> */}
   </main>
  );
}
