const url = 'https://coffee-shop-9alt.onrender.com';
const timeout = 100000; // 100 seconds

import axios from "axios";

axios.defaults.timeout = timeout;

export const authAxios = axios.create({
    baseURL: `${url}/user`,
});

export const productsAxios = axios.create({
    baseURL: `${url}/products`,
});