import axios from "axios";

const API_URL = "http://localhost:9000/location/";

class SearchService {
    // Search for a location
    searchLocation(searchTerm) {
        return axios
        .get(API_URL + "search/name/" + searchTerm, {
            query: searchTerm
        })
        .then(response => {
            return response.data;
        });
    }
}

export default new SearchService();