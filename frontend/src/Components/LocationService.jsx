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
  addLocation(locName, locDesc, longitude, latitude, locAddress, isBuilding, floorPlanLoc, links) {
    return axios
      .post(API_URL + "location", {
        name: locName,
        desc: locDesc,
        lon: longitude,
        lat: latitude,
        address: locAddress,
        // Some default values for now...
        shape: "POINT",
        color: "red",
        locImg: ' ', // Blank for now
        isBuilding,
        floorPlanLoc: floorPlanLoc,
        links,
        orgRequestor: AuthService.getCurrentUser().globalId
      }, { headers: AuthService.authHeader() })
      .then(response => {
        return response.status;
      });
  }

  /**
   * API to delete a location from the database provided its ID
   * @param {*} locID 
   * @returns 
   */
  deleteLocation(locID) {
    return axios
      .delete(API_URL + "location/" + locID,
      { headers: AuthService.authHeader() })
      .then(response => {
        return response.data;
      });
  }
  /**
   * API to get all locations from the database
   * @returns 
   */
  getLocations() {
    return axios.get(API_URL + "location").then(response => {
      return response.data;
    });
  }

  /**
   * API to get a single location from the database provided its ID
   * @param {*} locID 
   * @returns 
   */
  getLocation(locID) {
    return axios.get(API_URL + "location/" + locID)
    .then(response => {
      return response.data;
    });
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
  updateLocation(locName, locDesc, longitude, latitude, locAddress, isBuilding, floorPlanLoc, links) {
    return axios
      .put(API_URL + "location/" + locID, {
        name: locName,
        desc: locDesc,
        lon: longitude,
        lat: latitude,
        address: locAddress,
        // Some default values for now...
        shape: "POINT",
        color: "red",
        locImg: ' ', // Blank for now
        isBuilding,
        floorPlanLoc: floorPlanLoc,
        links,
        orgRequestor: AuthService.getCurrentUser().globalId
      }, { headers: AuthService.authHeader() })
      .then(response => {
        return response.status;
      });
  }
}

export default new LocationService();