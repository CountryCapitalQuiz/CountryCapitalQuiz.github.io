import { setUserData, getUserData, clearUserData } from "./data.js";

const host = 'https://parseapi.back4app.com';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);
        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.error)
        }
        return response.json();
    }catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'bRrAggyHMoMVL9uPNl4T9XPzDFxHMRIrxTEieDEN',
            'X-Parse-REST-API-Key': 'oyNNM1odjhrSzfCkWtVmkFTiZPgmZUelFFkE5uhX'
        }
    }
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    const userData = getUserData();
    if (userData != null) {
        options.headers['X-Parse-Session-Token'] = userData.token
    }
    return options;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(username, password) {
    const result = await post(`/login`, {username, password});
    const userData = {
        username: result.username,
        id: result.objectId,
        token: result.sessionToken
    }
    setUserData(userData);
}

export async function register(username, password) {
    const result = await post('/users', {username, password});
    const userData = {
        username,
        id: result.objectId,
        token: result.sessionToken
    }
    setUserData(userData);
}

export async function logout() {
    post('/logout');
    clearUserData();
}
