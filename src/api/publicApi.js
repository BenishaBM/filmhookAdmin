import axios from "axios";

const publicAPI = axios.create({
    baseURL:"https://www.filmhooks.annulartech.net"
});

export default publicAPI;