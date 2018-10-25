import axios from 'axios'

const http = axios.create({
  baseURL: 'http://192.168.0.182:3000/api',
  responseType: 'json'
})

export { http }
