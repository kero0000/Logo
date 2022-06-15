import axios from 'axios';


const BASE_URL = "https://logo-ecommerce-app.herokuapp.com/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser && currentUser.accessToken;


// public request no need log in
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{
        token:`Bearer ${TOKEN}`}
    });