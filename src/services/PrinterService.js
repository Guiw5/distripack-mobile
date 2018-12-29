import { ePOSBuilder, ePOSPrint } from '../lib/epson'
import { delay } from '../lib/commons'

class PrinterService {
  constructor(ip = '192.168.0.3', devId = 'local_printer', timeout = 3000) {
    this.builder = new ePOSBuilder()
    this.epos = new ePOSPrint(ip, devId, timeout)
  }

  status = async status => {
    if (status) {
      return this.checkStatus(status)
    }
    let { data } = await this.epos.print()
    return this.checkStatus(data)
  }

  checkStatus = data => {
    let { success, status, code } = this.extract(data)
    return this.epos.checkStatus(success, status, code)
  }

  extract = data => {
    return this.epos.extract(data)
  }

  printOrders = async orders => {
    this.builder.build(orders)
    let content = this.builder.toString()
    this.builder.clean()

    let date = new Date()
    let printJobId =
      `${date.getHours()}` +
      `${date.getMinutes()}` +
      `${date.getSeconds()}` +
      `${date.getMilliseconds()}`

    let timeout = (orders.length + 1) * 1.5 * 1000
    return await this.epos.print(printJobId, content, timeout)
  }
}
let printerService = new PrinterService()
export default printerService
