import Link from "next/link";
import { sort } from 'fast-sort';
interface User {
    id: number,
    name: string,
    email: string
}

interface Props{
    sortOrder : string
}
const Usertable = async ( {sortOrder}: Props) => {
    const res = await fetch(
        'https://jsonplaceholder.typicode.com/users'
        , {
            cache: 'no-store'
        }
    );
    const userData: User[] = await res.json();
    // console.log("user data : ", userData);


   const sortedUsers = sort(userData).asc(sortOrder === 'email' ? user => user.email : user => user.name )
    return (
        <table className="table table-bordered" >
            <thead >
                <tr>
                    <th><Link href="users?sortOrder=name"> Name</Link> </th>
                    <th><Link href="users?sortOrder=email"> Email</Link></th>
                </tr>
            </thead>
            <tbody>
                {
                    sortedUsers.map((user) => <tr key={user.id}>
                        <td> {user.name}</td>
                        <td> {user.email}</td>
                    </tr>)

                }
            </tbody>
        </table>
    )
}

export default Usertable;