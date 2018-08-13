import axios from 'axios'
//172.20.0.53
const http = axios.create({
  baseURL: 'http://192.168.0.68:3005/api',
  responseType: 'json'
})

export default http
