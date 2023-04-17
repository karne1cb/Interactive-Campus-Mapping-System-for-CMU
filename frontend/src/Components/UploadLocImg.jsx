import React from "react";
import axios from "axios";

export default function UploadLocImg() {

    const handleFileChange = (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        console.log(formData.get("image"));
        axios.post("http://localhost:9000/uploadLocImg/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="upload-loc-img">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            <label htmlFor="file">Upload Image</label>
        </div>
    );
}