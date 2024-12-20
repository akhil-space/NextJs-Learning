
interface Props{
    params: Promise<{slug: string[]}>;
    
    searchParams: Promise<{sortOrder: string}>;
}
const Dairy = async ({params , searchParams} : Props) => {

const  {slug}= await params;
const {sortOrder}=await searchParams;
    return (
        <div> products :{slug}  : {sortOrder}</div>
    )
}

export default Dairy;