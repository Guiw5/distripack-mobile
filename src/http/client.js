import axios from 'axios'

/**
 * http://192.168.0.182:3000/api
 */

const http = axios.create({
  baseURL: 'http://192.168.0.7:3000/api',
  // baseURL: 'http://ec2-18-220-58-115.us-east-2.compute.amazonaws.com/api',
  responseType: 'json'
})

export { http }
