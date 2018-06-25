import axios from 'axios';

axios.defaults.baseURL = "http://10.20.20.126:8080";

export function getUsers(id){
    return axios.get("users", {
        withCredentials: true
    });
}