
import { useState } from "react";
import toast from "react-hot-toast";
import uploadFile from "../utils/mediaUpload";


export default function TestPage(){
    
const [file,setfile] = useState(null)

function handleUpload(){
    uploadFile(file).then(
        (url)=>{
            console.log(url)
            console.log(url)
            //toast.success("Upload success")
        }
    ).catch(
        (error)=>{
            console.log("Error uploading file:", error);
            toast.error(error)
        }
    )
}

    return(
        <div className="w-full h-screen flex items-center justify-center">
            <input type="file"onChange={
                (e)=>{
                    console.log(e)
                    console.log(e.target.files[0])
                    setfile(e.target.files[0])
                }
             } />
             <button onClick={handleUpload} className="bg-black text-white rounded-2xl cursor-pointer">Upload</button>
       </div>    
    )
}