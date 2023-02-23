/**
 * This file provides an authentication service to make working with authentication easier.
 * 
 * Some code adapted from https://www.bezkoder.com/react-jwt-auth/
 */

import axios from "axios";

const API_URL = "http://localhost:9000/";

// Class to hold authentication related functions
class AuthService {
  // Log user in to system
  login(un, pw) {
    return axios
      .post(API_URL + "login", {
        globalId: un,
        password: pw
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  // Log user out
  logout() {
    localStorage.removeItem("user");
  }

  // Register a user
  register(email, password, role) {
    return axios.post(API_URL + "register", {
      email: email,
      password: password,
      role: role
    });
  }

  // Get JSON object with accessToken:[token value]
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Easy way to get header for authentication
  authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }

  // Determine if user is admin WARNING: Might not want to use this in production to restrict routes
  async isAdmin() {
      try {
        let res = await axios({
          url: API_URL + 'adminTest',
          method: 'get',
          timeout: 8000,
          headers: this.authHeader()
        })
         if(res.status === 200){
             return true;
         }    
         return false;
     }
     catch (err) {
         console.error(err);
     }
  }
}

export default new AuthService();