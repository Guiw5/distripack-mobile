import { ePOSBuilder, ePOSPrint } from '../lib/epson'
import { printer } from '../http/client'
import Config from '../../config.json'
import {
  SuccessCode,
  ASB_PRINT_SUCCESS_TEST,
  ASB_PRINT_SUCCESS
} from '../lib/types'
import moment from 'moment'

class PrinterService {
  constructor() {
    this.builder = new ePOSBuilder()
    this.epos = new ePOSPrint(printer)
  }

  status = async () => {
    const { data } = await this.epos.status()
    return this.results(data)
  }

  results = info => {
    const result = this.epos.results(info)
    return result
  }

  print = async orders => {
    this.builder.build(orders)
    let content = this.builder.toString()
    this.builder.clean()
    let timeout = (orders.length + 1) * 1.5 * 1000
    let printjobid = 'ABCD123'
    return await this.epos.print(printjobid, content, timeout)
  }

  isOk = data => {
    let { success, status } = this.epos.extract(data)
    return success && Boolean(status & ASB_PRINT_SUCCESS)
  }
}

class PrinterMock extends PrinterService {
  constructor() {
    super()
  }

  status = () => this.results()

  results = info => {
    return [{ ...SuccessCode[ASB_PRINT_SUCCESS_TEST], timestamp: +moment() }]
  }

  print = async orders => 'ok'

  isOk = data => true
}

let printerService = Config.printer.productive
  ? new PrinterService()
  : new PrinterMock()

export default printerService
