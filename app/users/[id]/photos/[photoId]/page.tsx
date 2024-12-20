import React from "react"
interface Props{


    params:{
        id: number, photoId: number
    }
}

const PhotoPage =( {params : { id , photoId}}:Props) =>{
console.log(id , " : , ", photoId);

    return <div>

PhotoPage userId {id} and PhotoId : {photoId}
    </div>
}


export default PhotoPage;