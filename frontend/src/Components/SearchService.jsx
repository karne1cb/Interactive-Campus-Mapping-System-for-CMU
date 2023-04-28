import axios from "axios";

const API_URL = "http://localhost:9000/location/";

/**
 * Provides services for searching for locations
 */
class SearchService {
    /**
     * Searches for a location by name
     * @param {*} searchTerm search term to search for
     * @returns Locations that match the search term
     */
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