import React from "react";
import axios from "axios";
import AuthService from "./AuthService";

const API_URL = "http://localhost:9000/";

class LocImgService {

    /**
     * API to add an image to the database
     * @param {*} locImg The image to add (in base64)
     * @returns
     * @memberof UploadLocImg 
     */
    async addImage(locImg) {
        const response = await axios
            .post(API_URL + "locImg", {
                img: locImg
            }, { headers: AuthService.authHeader() });
        return response;
    }
    
    /**
     * Updates an image in the database provided its ID
     * @param {*} locImgID 
     * @param {*} locImg 
     * @returns 
     */
    async updateImage(locImgID, locImg) {
        const response = await axios
            .put(API_URL + "locImg/" + locImgID, {
                img: locImg
            }, { headers: AuthService.authHeader() });
        return response.status;
    }

    /**
     * API to delete an image from the database
     * @param {*} locImgID ID of the image to delete
     * @returns
     * @memberof UploadLocImg
     */
    async deleteImage(locImgID) {
        const response = await axios
            .delete(API_URL + "locImg/" + locImgID, { headers: AuthService.authHeader() });
        return response.data;
    }

    /**
     * API to get a single image from the database by its ID
     * @param {*} locImgID ID of the image to get
     * @returns
     * @memberof UploadLocImg
     */
    async getImage(locImgID) {
        const response = await axios.get(API_URL + "locImg/" + locImgID);
        return response.data;
    }


}

export default new LocImgService;