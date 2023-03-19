import axios from "axios";
const requestAxios = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
});
export default requestAxios;
