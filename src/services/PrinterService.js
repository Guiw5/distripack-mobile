import { ePOSBuilder, ePOSPrint } from '../lib/epson'
import { printer } from '../http/client'

class PrinterService {
  constructor() {
    this.builder = new ePOSBuilder()
    this.epos = new ePOSPrint(printer)
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
    let timeout = (orders.length + 1) * 1.5 * 1000
    let printjobid = 'ABCD123'
    return await this.epos.print(printjobid, content, timeout)
  }
}
let printerService = new PrinterService()
export default printerService
