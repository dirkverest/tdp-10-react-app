import config from './config';
import Cookies from 'js-cookie';

// TODO: Error component

export default class Data {

    // Construct fetch method
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;
        const reqOptions = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }
        // If body info, add body options to req header
        if (body) {
            reqOptions.body = JSON.stringify(body);
        }
        // If requiresAuth, encode credentials and add basic auth to req header
        if (requiresAuth) {
            const savedCredentials = Cookies.getJSON('creds');
            if (savedCredentials) {
                reqOptions.headers['Authorization'] = `Basic ${savedCredentials}`;
            } else {
                const encodedCred = btoa(`${credentials.username}:${credentials.password}`);
                Cookies.set('creds', encodedCred, { expires: 1 });
                reqOptions.headers['Authorization'] = `Basic ${encodedCred}`;
            }
        }

        return fetch(url, reqOptions);
    }

    // get existing user
    async getUser(username, password) {
        const response = await this.api('/users', 'GET', null, true, {username, password});
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
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.Errors;
            });
        } else {
            throw new Error();
        }
    }

    // Get all courses
    async coursesGetAll() {
        const response = await this.api('/courses');
        if (response.status === 200) {
            return response;
        }
    }

    // Get Course details
    async courseDetails(id) {
        const response = await this.api(`/courses/${id}`);
        if (response.status === 200) {
            return response;
        } else if (response.status === 404) {
            return response;
        }
    }

    // Delete Course
    async couseDelete(id) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true);
        if (response.status === 204) {
            return response;
        } else {
            console.log(response);
        }
    }

    // Delete Course
    async courseUpdate(id, course) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true);
        if (response.status === 204) {
            return response;
        } else if (response.status === 400) {
            return response.json()
            .then(data => {
                return data.errors;
            });
        } else {
            console.log(response);
        }
    }
}