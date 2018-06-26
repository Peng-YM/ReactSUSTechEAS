import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
import axios from 'axios';
import {Base64} from 'js-base64';

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const {username, password} = params;
        return axios.get('http://10.20.20.126:8080', {
            auth: {
                username: username,
                password: password
            }
        }).then(res => {
            const hash = Base64.encode(username + ':' + password);
            localStorage.setItem('token', `Basic ${hash}`);
            localStorage.setItem('username', username);
        });
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        localStorage.removeItem('toeken')
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unknown method');
};