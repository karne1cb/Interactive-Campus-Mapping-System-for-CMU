import AuthService from "./AuthService";
import axios from "axios";

const API_URL = "http://localhost:9000/";

class LocationService {
  /*
    * This is where admins can add locations to the database
    * This page will be accessed from the admin pmenu in the navbar
    * This page will have a form that will allow the admin to enter the location's information
    * The admin will then be prompted to confirm the addition
    * If the admin confirms, the location will be added to the database
    * FOR NOW THE shape, color and locImg WILL BE HARDCODED (TODO: CHANGE THIS)
   */
    addLocation(locName, locDesc, longitude, latitude, locAddress, isBuilding, buildingId, isInBuilding, inBuildingId, floorNum, roomNum, links) {
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
        buildingId,
        isInBuilding,
        inBuildingId,
        floor: floorNum,
        roomLoc: roomNum,
        links,
        orgRequestor: AuthService.getCurrentUser().globalId
      }, {headers: AuthService.authHeader()})
      .then(response => {
        return response.status;
      });
  }

  removeLocation(locName) {
    return axios
      .post(API_URL + "location", {
        locName
      })
      .then(response => {
        return response.data;
      });
  }

  getLocations() {
    return axios.get(API_URL + "location").then(response => {
      return response.data;
    });
  }
}

export default new LocationService();