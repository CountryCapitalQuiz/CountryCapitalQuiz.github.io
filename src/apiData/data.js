import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getTopTen(continent){
    return api.get(`/classes/${continent}?order=-rating&limit=10`);    
}

export async function saveNewScore(continent, data) {
    return api.post(`/classes/${continent}`, data);
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}