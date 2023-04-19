import React, { Component } from "react";
import axios from "axios";
import ImageService from "./ImageService";

export default function UploadLocImg(props) {
    const { locName, setLocImg } = props;

    const handleFileChange = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const ext = e.target.files[0].name.split(".").pop();
        
        formData.append("image", e.target.files[0], __filename=`${locName}.${ext}`);
        console.log(formData.get("image"));
        // axios.post("http://localhost:9000/uploadLocImg/", formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then((res) => {
        //     newFileName = res.data;
        // }).catch((err) => {
        //     console.log(err);
        // });
        const newFileName = ImageService.uploadLocImg(formData);
        setLocImg(`/img_uploads/${newFileName}`)
        return false;
    };

    return (
        <div className="upload-loc-img">
            <input
                name="image_upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
}