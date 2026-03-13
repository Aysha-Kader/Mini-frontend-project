import axios from "axios";
const API=axios.create({
    baseURL:"https://mini-frontend-project.onrender.com/api",
});
export default API;