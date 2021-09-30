import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  timeout: 6000,
});

export default Axios;
