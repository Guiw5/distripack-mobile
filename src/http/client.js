import axios from 'axios'
import Config from '../../config.json'

const http = axios.create({
  baseURL: Config.apiUrl,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json'
})

const printer = axios.create({
  baseURL: Config.printer.baseUrl,
  timeout: Config.printer.timeout,
  responseType: 'text',
  headers: {
    'Content-Type': 'text/xml;charset=utf-8',
    'If-Modified-Since': 'Thu, 01 Jan 1970 00:00:00 GMT',
    SOAPAction: '""'
  }
})

export { http, printer }
