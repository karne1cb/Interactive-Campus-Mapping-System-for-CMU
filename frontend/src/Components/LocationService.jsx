import AuthService from "./AuthService";
import axios from "axios";

const API_URL = "http://localhost:9000/";

/**
 * Provides services for locations
 */
class LocationService {

  /**
   * API to add a location to the database
   * @param {*} locName Name of the locaiton
   * @param {*} locDesc Description of the locaiton
   * @param {*} longitude Longitude of the location
   * @param {*} latitude Latutude of the location
   * @param {*} locAddress Address of the location
   * @param {*} isBuilding A boolean to determine if the location is a building
   * @param {*} floorPlanLoc The floor plan of the location (if a building)
   * @param {*} links Links related to the location
   * @returns response status (200 if successful)
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
   * @param {*} locID id of the location
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
   * @returns all lcations
   */
  async getLocations() {
    const response = await axios.get(API_URL + "location");
    return response.data;
  }

  /**
   * API to get a single location from the database provided its ID
   * @param {*} locID the id of the location
   * @returns data of the location
   */
  async getLocation(locID) {
    const response = await axios.get(API_URL + "location/" + locID);
    return response.data;
  }

  /**
   * API to update a location in the database provided its ID
   * @param {*} locName Name of the locaiton
   * @param {*} locDesc Description of the locaiton
   * @param {*} longitude Longitude of the location
   * @param {*} latitude Latutude of the location
   * @param {*} locAddress Address of the location
   * @param {*} isBuilding A boolean to determine if the location is a building
   * @param {*} floorPlanLoc The floor plan of the location (if a building)
   * @param {*} links Links related to the location
   * @returns response status (200 if successful)
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