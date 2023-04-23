import React from "react";
import axios from "axios";

const API_URL = "http://localhost:9000/";

class LocImgService {

    /**
     * API to add an image to the database
     * @param {*} locImg The image to add (in base64)
     * @returns
     * @memberof UploadLocImg 
     */
    addImage(locImg) {
        return axios
            .post(API_URL + "uploadLocImg", {
                locImg: locImg
            })
            .then(response => {
                return response.status;
            });
    }

    /**
     * API to delete an image from the database
     * @param {*} locImgID ID of the image to delete
     * @returns
     * @memberof UploadLocImg
     */
    deleteImage(locImgID) {
        return axios
            .delete(API_URL + "uploadLocImg/" + locImgID)
            .then(response => {
                return response.data;
            });
    }

    /**
     * API to get a single image from the database by its ID
     * @param {*} locImgID ID of the image to get
     * @returns
     * @memberof UploadLocImg
     */
    getImage(locImgID) {
        return axios.get(API_URL + "uploadLocImg/" + locImgID)
            .then(response => {
                return response.data;
            });
    }


}

export default LocImgService;