import Usertable from "./Usertable";




interface Props {
 searchParams :{sortOrder : string}
}

const User = async ({searchParams : {sortOrder}} : Props) => {
    console.log("sortOrder :" , sortOrder);
    
    return <> <div className="main">
    <h1>user component</h1>
    <Usertable  sortOrder={sortOrder}/>
   {/* <Suspense fallback={<p>loading</p>}>
   
   </Suspense> */}
</div></>
}


export default User;