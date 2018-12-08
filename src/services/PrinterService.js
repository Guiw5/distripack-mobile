import { ePOSBuilder, ePOSPrint } from '../lib/epson'

class PrinterService {
  constructor(ip = '192.168.0.3', devId = 'local_printer', timeout = 6000) {
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
    let { success, status, code } = this.epos.extract(data)
    return this.epos.checkStatus(success, status, code)
  }

  printOrders = async orders => {
    this.builder.build(orders)
    let date = new Date()
    let printJobId =
      `${date.getHours()}` +
      `${date.getMinutes()}` +
      `${date.getSeconds()}` +
      `${date.getMilliseconds()}`

    let data = await this.epos.print(this.builder.toString(), printJobId)
    console.log('response orders', data)
    this.builder.clean()
    return data
  }
}
let printerService = new PrinterService()
export default printerService
