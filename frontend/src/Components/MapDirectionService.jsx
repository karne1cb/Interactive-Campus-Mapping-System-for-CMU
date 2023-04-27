import AuthService from "./AuthService";
import axios from "axios";

const API_URL = "http://localhost:9000/";

export default class MapDirectionService {

    reverseLatLon(loc) {
        return loc.lon + "," + loc.lat;
    }

    getWalkingDirections(start, end,) {
        const test = API_URL + "directions/walking/" + this.reverseLatLon(start) + "," + this.reverseLatLon(end)
        console.log(test);
        return axios.get(test, { headers: AuthService.authHeader() })
            .then(response => {
                return response.data;
            });
    }
}