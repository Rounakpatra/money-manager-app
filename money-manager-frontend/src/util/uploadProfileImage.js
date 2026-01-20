import { API_ENDPOINTS } from "./apiEndPoints.js";

const CLOUDINARY_UPLOAD_PRESET="money-manager";

const uploadProfileImage= async (image) =>{
    const formData=new FormData();

    formData.append("file",image);
    formData.append("upload_preset",CLOUDINARY_UPLOAD_PRESET);


    try{

        const response=await fetch(API_ENDPOINTS.UPLOAD_IMAGE,{
            method: "POST",
            body: formData
        });

        if(!response.ok){
            throw new Error("Cloudinary upload failed: ");
        }

        const data = await response.json();
        console.log("Image upload success");

        return data.secure_url;
    }catch(err){

        console.error("Error uploading image ",err);
        throw err;

    }

} 


export default uploadProfileImage;



