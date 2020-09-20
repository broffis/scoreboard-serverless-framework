import axios from 'axios';

const apiRoute = process.env.REACT_APP_API_ENDPOINT;
let url = apiRoute;

const local = axios.create({
  baseURL: url,
});

export default local;