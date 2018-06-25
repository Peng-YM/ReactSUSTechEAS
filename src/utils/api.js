import axios from 'axios';
import _ from 'underscore';

axios.defaults.baseURL = "http://10.20.20.126:8080";
const config = {
    withCredentials: true
};

export function getURLs(urls){
    const requests = []
    _.each(urls, url => {
        requests.push(axios.get(url, config)
        .then(res => res.data));
    });
    return requests;
}

export function createOne(resourceName, source){
    return axios.post(resourceName, source, config)
        .then(res => res.data);
}

export function updateOne(resourceName, source){
    return axios.patch(`${resourceName}/${source.id}`, source, config)
        .then(res => res.data);
}

export function getOne(resourceName, id){
    return axios.get(`${resourceName}/${id}`, config)
        .then(res => res.data);
}

export function getList(resourceName){
    return axios.get(resourceName, config)
        .then(res => res.data._embedded[resourceName]);
}

export function getManyReference(resourceName, targetName, source){
    let rels = source._links[targetName]; 
    return axios.all(getURLs(rels))
        .then(
            res => res.map(item => item._embedded[targetName])
        );
}

export function setManyReference(targetName, source, targets){
    let body = targets.map(target => target._links.self.href).join("\n");
    let rel = source._links[targetName].href;

    console.log(rel);
    console.log(body);
    return axios.put(rel, body, {
        withCredentials: true,
        headers: {
            'Content-Type': 'text/uri-list'
        }
    });
}

export function isIdExists(list, id){
    var result = -1;
    for(let i = 0; i < list.length; i++){
        if(list[i].id === id){
            return i;
        }
    }
    return result;
}