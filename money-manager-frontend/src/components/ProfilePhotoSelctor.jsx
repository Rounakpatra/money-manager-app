import React, { useRef, useState } from 'react'
import {Trash, Upload, User} from "lucide-react";

const ProfilePhotoSelctor = ({ image, setImage }) => {

    const inputRef = useRef(null);
    const [previewUrl, setpreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setpreviewUrl(preview);

        }
    }

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setpreviewUrl(null);
    }

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();
    }

    return (

        <div>
            <input type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"


            />

            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                    <User className="text-purple-500" size={35} />

                    <button
                        onClick={onChooseFile}
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1">
                        <Upload size={15} className="text-purple-500" />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img src={previewUrl} alt="profile photo" className="w-20 h-20 rounded-full object-cover" />
                    <button
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute -bottom-1 -right-1">
                        <Trash size={15} />
                    </button>
                </div>
            )}
        </div>

    )
}

export default ProfilePhotoSelctor