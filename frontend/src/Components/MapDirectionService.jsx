import AuthService from "./AuthService";
import axios from "axios";

const API_URL = "http://localhost:9000/";

/**
 * Provides services for getting directions from the map
 */
export default class MapDirectionService {

    /**
     * Reverses the lat and lon of a location and puts them into a string
     * @param {*} loc The location to reverse
     * @returns The reversed location
     */
    reverseLatLon(loc) {
        return loc.lon + "," + loc.lat;
    }

    /**
     * Gets the walking directions from the start to the end
     * @param {*} start location to start from (lon, lat)
     * @param {*} end location to end at (lon, lat)
     * @returns Direction data from the API (GEOJSON)
     */
    getWalkingDirections(start, end,) {
        const test = API_URL + "directions/walking/" + this.reverseLatLon(start) + "," + this.reverseLatLon(end)
        console.log(test);
        return axios.get(test, { headers: AuthService.authHeader() })
            .then(response => {
                return response.data;
            });
    }
}