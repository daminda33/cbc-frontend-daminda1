const url = "https://rnrvrkohdjzeofmzxlky.supabase.co"
const key = "sb_publishable_QXNoZc3_BclHOpI-u76-hg_-Q-grebF"
import { createClient } from '@supabase/supabase-js'
import toast from 'react-hot-toast'
const supabase = createClient(url,key)

export default function uploadFile(file){
    const promise = new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject("Please select a file to upload")
                return
            }
            const timeStamp = new Date().getTime();
            const fileName = timeStamp+"-"+file.name 
           // console.log(fileName)

            supabase.storage.from("images").upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
    }).then(
        ()=>{
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
           // console.log("File public URL:", publicUrl)
            resolve(publicUrl)
            toast.success("File is uploaded successfully")
           // console.log("file upload success")
        }
    ).catch(
        (error)=>{ 
            toast.error("Failed to upload ")
            reject("Failed to upload")
        }
    )

        }
    )
    return promise;

}