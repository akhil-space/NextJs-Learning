import { notFound } from "next/navigation"
import React from "react"

interface Props {
 params: { id: number}
}
const UserDetailsPage =async ({ params : {id}}: Props) => {
    // const id = await params;
if(id > 10) notFound();

    return (
        <div> UserDetailsPage  : {id}</div>
    )
}

export default UserDetailsPage