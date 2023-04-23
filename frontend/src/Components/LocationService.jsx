import AuthService from "./AuthService";
import axios from "axios";

const API_URL = "http://localhost:9000/";

class LocationService {

  /**
   * API to add a location to the database
   * @param {*} locName 
   * @param {*} locDesc 
   * @param {*} longitude 
   * @param {*} latitude 
   * @param {*} locAddress 
   * @param {*} isBuilding 
   * @param {*} floorPlanLoc 
   * @param {*} links 
   * @returns 
   */
  async addLocation(locName, locDesc, longitude, latitude, locAddress, locImg, isBuilding, floorPlanLoc, links) {
    const response = await axios
      .post(API_URL + "location", {
        name: locName,
        desc: locDesc,
        lon: longitude,
        lat: latitude,
        address: locAddress,
        // Some default values for now...
        shape: "POINT",
        color: "red",
        locImg: locImg,
        isBuilding,
        floorPlanLoc: floorPlanLoc,
        links,
        orgRequestor: AuthService.getCurrentUser().globalId
      }, { headers: AuthService.authHeader() });
    return response.status;
  }

  /**
   * API to delete a location from the database provided its ID
   * @param {*} locID 
   * @returns 
   */
  async deleteLocation(locID) {
    const response = await axios
      .delete(API_URL + "location/" + locID,
        { headers: AuthService.authHeader() });
    return response.data;
  }
  /**
   * API to get all locations from the database
   * @returns 
   */
  async getLocations() {
    const response = await axios.get(API_URL + "location");
    return response.data;
  }

  /**
   * API to get a single location from the database provided its ID
   * @param {*} locID 
   * @returns 
   */
  async getLocation(locID) {
    const response = await axios.get(API_URL + "location/" + locID);
    return response.data;
  }

  /**
   * API to update a location in the database provided its ID
   * @param {*} locName 
   * @param {*} locDesc 
   * @param {*} longitude 
   * @param {*} latitude 
   * @param {*} locAddress 
   * @param {*} isBuilding 
   * @param {*} floorPlanLoc 
   * @param {*} links 
   * @returns 
   */
  async updateLocation(locID, locName, locDesc, longitude, latitude, locAddress, locImg, isBuilding, floorPlanLoc, links) {
    const response = await axios
      .put(API_URL + "location/" + locID, {
        name: locName,
        desc: locDesc,
        lon: longitude,
        lat: latitude,
        address: locAddress,
        // Some default values for now...
        shape: "POINT",
        color: "red",
        locImg: locImg,
        isBuilding,
        floorPlanLoc: floorPlanLoc,
        links,
        orgRequestor: AuthService.getCurrentUser().globalId
      }, { headers: AuthService.authHeader() });
    return response.status;
  }
}

export default new LocationService();