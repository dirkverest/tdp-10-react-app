import config from "./config";
import Cookies from "js-cookie";

export default class Data {
  /**
   * api() constructs the params for a fetch request
   * based on the passed-in path, and optional method, body, requiresAuth, and credentials
   * and returns a fetch response
   */
  // Construct fetch method
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;
    const reqOptions = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    // If body info, add body options to req header
    if (body) {
      reqOptions.body = JSON.stringify(body);
    }
    // If requiresAuth, encode credentials and add basic auth to req header
    if (requiresAuth) {
      const userCredentials = Cookies.getJSON("creds") || credentials;
      reqOptions.headers["Authorization"] = `Basic ${userCredentials}`;
    }

    return fetch(url, reqOptions);
  }

  /**
   * all functions below call api() based on the passed-in params
   * and returns a response based on the response code, or throw an error
   */

  // Get existing user
  async getUser(credentials) {
    const response = await this.api("/users", "GET", null, true, credentials);
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 401) {
      return response.json();
    } else {
      throw new Error();
    }
  }

  // Create new user
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data;
      });
    } else {
      throw new Error();
    }
  }

  // Get all courses
  async coursesGetAll() {
    const response = await this.api("/courses");
    if (response.status === 200) {
      return response;
    } else {
      throw new Error();
    }
  }

  // Get Course details
  async courseDetails(id) {
    const response = await this.api(`/courses/${id}`);
    if (response.status === 200) {
      return response;
    } else if (response.status === 404) {
      return response;
    } else {
      throw new Error();
    }
  }

  // Delete Course
  async couseDelete(id) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true);
    if (response.status === 204) {
      return response;
    } else {
      throw new Error();
    }
  }

  // Update Course
  async courseUpdate(id, course) {
    const response = await this.api(`/courses/${id}`, "PUT", course, true);
    if (response.status === 204) {
      return response;
    } else if (response.status === 400) {
      return response.json().then((error) => {
        return error;
      });
    } else {
      throw new Error();
    }
  }

  // Create Course
  async courseCreate(course) {
    const response = await this.api("/courses/", "POST", course, true);
    if (response.status === 201) {
      return response;
    } else if (response.status === 400) {
      return response.json().then((error) => {
        return error;
      });
    } else {
      throw new Error();
    }
  }
}
