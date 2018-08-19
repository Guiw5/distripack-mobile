import axios from 'axios'
//172.20.0.53
//192.168.137.1:3000
//192.168.0.68:3000
//192.168.0.182:3000
//169.254.207.227
const http = axios.create({
  baseURL: 'http://169.254.207.227:3000/api',
  responseType: 'json'
})

export { http }
