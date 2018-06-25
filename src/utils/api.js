import axios from 'axios';

axios.defaults.baseURL = "http://10.20.20.126:8080";

export function getUsers(){
    return axios.get("users", {
        withCredentials: true
    }).then(res => res.data._embedded);
}

export function getUserCourses(user){
    return axios.get(`${user._link.courses}`, {
        withCredentials: true
    }).then(res => res.data._embedded);
}

export function registerCourse(course, user){
    return getUserCourses
        .then(courses => {
            courses.push(course);
            let body = courses.join("\n");
            return axios.put(user._link.courses, body, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'text/uri-list'
                }
            });
        });
}