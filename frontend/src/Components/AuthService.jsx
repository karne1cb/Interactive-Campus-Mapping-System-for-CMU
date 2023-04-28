/**
 * This file provides an authentication service to make working with authentication easier.
 * Some code adapted from https://www.bezkoder.com/react-jwt-auth/
 */

import axios from "axios";

const API_URL = "http://localhost:9000/";

/**
 * Provides authentication services
 * @returns The AuthService class
 */
class AuthService {
  /**
   * Logs the user in
   * @param {*} un globalId of the user
   * @param {*} pw password of the user
   * @returns Either a JSON object with an accessToken or an error
   */
  login(un, pw) {
    return axios
      .post(API_URL + "login", {
        globalId: un,
        password: pw
      })
      .then(response => {
        if (response.data.accessToken) {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  /**
   * Logs the user out
   */
  logout() {
    localStorage.removeItem("user");
  }

  /**
   * Gets the current user from local storage
   * @returns The current user
   */
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Gets the authorization header for the user from local storage
   * @returns The authorization header for the user
   */
  authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }

  /**
   * Determine if user is admin
   * @returns True if the user is an admin, false otherwise
   */
  async isAdmin() {
    try {
      let res = await axios({
        url: API_URL + 'adminTest',
        method: 'get',
        timeout: 8000,
        headers: this.authHeader()
      })
      if (res.status === 200) {
        return true;
      }
      return false;
    }
    catch (err) {
      console.error(err);
    }
  }

  /**
   * Determine if user is logged in
   * @returns True if the user is logged in, false otherwise
   */
  async isLoggedIn() {
    try {
      let res = await axios({
        url: API_URL + 'authCheck',
        method: 'get',
        timeout: 8000,
        headers: this.authHeader()
      })
      if (res.status === 200) {
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