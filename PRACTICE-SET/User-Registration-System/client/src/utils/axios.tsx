import axios from 'axios';

import { HOST_API } from '../config-global';


const axiosInstance = axios.create({
    baseURL: HOST_API,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject((error.response && error.response.data) || 'An error occurred'))


export default axiosInstance;  

export const endpoints = {
    login: '/login',
    signup: '/signup',
    logout: '/logout',
    profileDetails: '/profile-details',
}