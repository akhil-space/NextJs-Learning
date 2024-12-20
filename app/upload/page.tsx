'use client';

import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
    publicId: string
}
const UploadFile = () => {
    const [publicId, setPublicId] = useState('');

    return (
        <>
            {
                publicId && <CldImage src={publicId} width={260} height={104} />
            }
            <div>
                <CldUploadWidget

                    uploadPreset="ml_default"
                    onUploadAdded={(result, widget) => {
                        console.log(result);

                        if (result.event !== 'upload-added') return;
                        const info = result.info as CloudinaryResult;

                        setPublicId(info.publicId);
                        console.log("wrokign fine");
                    }}

                >
                    {
                        ({ open }) => <button className="btn btn-primary" onClick={() => { open() }}>Upload</button>
                    }
                    {/* {
                    (open) => (<button onClick={() => { open() }}>Upload</button>)
                } */}
                </CldUploadWidget>
            </div>
        </>
    )
}

export default UploadFile;