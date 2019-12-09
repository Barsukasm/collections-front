import axios from 'axios';

const collectionsApi = axios.create({
  baseURL: 'http://localhost:8080/'
});


export default collectionsApi;