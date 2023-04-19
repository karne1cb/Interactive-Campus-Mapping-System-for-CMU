import axios from "axios";

export default new class ImageService{
    uploadLocImg(formData) {
        return axios.post("http://localhost:9000/uploadLocImg/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            return res;
        }).catch((err) => {
            console.log(err);
        });
    };
}