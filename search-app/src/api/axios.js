import axios from "axios";

// Axios server handle for simpler requests (login and signup)
export default axios.create({
  baseURL: "http://localhost:9000",
});