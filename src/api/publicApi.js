import axios from "axios";

const publicAPI = axios.create({
    baseURL:"https://filmhook.annularprojects.com/filmhook-0.1"
});

export default publicAPI;