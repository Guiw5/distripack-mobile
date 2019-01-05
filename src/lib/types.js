export const ERROR_NETWORK = 'Network Error'
export const ERROR_PARAMMETER = 'ERROR_PARAMMETER'
export const ERROR_COMMAND = 'ERROR_COMMAND'
export const ERROR_DEVICE_NOT_FOUND = 'DeviceNotFound'
export const ERROR_DEVICE_BUSY = 'ERROR_DEVICE_BUSY'
export const ERROR_NOT_SUPPORTED = 'ERROR_NOT_SUPPORTED'
export const ERROR_COVER_OPEN = 'EPTR_COVER_OPEN'
export const ERROR_TIMEOUT = 'EX_TIMEOUT'
export const ERROR_AUTOMATICAL = 'EPTR_AUTOMATICAL'
export const ERROR_UNRECOVERABLE = 'EPTR_UNRECOVERABLE'
export const ERROR_BADPORT = 'EX_BADPORT'
export const SYSTEM_ERROR = 'SYSTEM_ERROR'
export const EPTR_CUTTER = 'EPTR_CUTTER'
export const EPTR_MECHANICAL = 'EPTR_MECHANICAL'
export const EPTR_REC_EMPTY = 'EPTR_REC_EMPTY'
export const EPTR_SCHEMAERROR = 'SchemaError'
export const EPTR_PRINT_SYSTEM_ERROR = 'PrintSystemError'
export const ASB_NO_RESPONSE = 1
export const ASB_PRINT_SUCCESS = 2
export const ASB_DRAWER_KICK = 4
export const ASB_BATTERY_OFFLINE = 4
export const ASB_OFF_LINE = 8
export const ASB_COVER_OPEN = 32
export const ASB_PAPER_FEED = 64
export const ASB_WAIT_ON_LINE = 256
export const ASB_PANEL_SWITCH = 512
export const ASB_MECHANICAL_ERR = 1024
export const ASB_AUTOCUTTER_ERR = 2048
export const ASB_UNRECOVER_ERR = 8192
export const ASB_AUTORECOVER_ERR = 16384
export const ASB_RECEIPT_NEAR_END = 131072
export const ASB_RECEIPT_END = 524288

// export const ErrorEnum = {
//   ERROR_PARAMMETER: 1,
//   ERROR_COMMAND: 2,
//   ERROR_DEVICE_NOT_FOUND: 3,
//   ERROR_DEVICE_BUSY: 4,
//   ERROR_NOT_SUPPORTED: 5,
//   ERROR_COVER_OPEN: 6,
//   ERROR_TIMEOUT: 7,
//   ERROR_AUTOMATICAL: 8,
//   ERROR_UNRECOVERABLE: 9,
//   ERROR_BADPORT: 10,
//   SYSTEM_ERROR: 11,
//   EPTR_CUTTER: 12,
//   EPTR_MECHANICAL: 13,
//   EPTR_REC_EMPTY: 14,
//   EPTR_SCHEMAERROR: 15,
//   EPTR_PRINT_SYSTEM_ERROR: 16
// }

// export const WarningEnum = {
//   ASB_NO_RESPONSE: 1,
//   ASB_PRINT_SUCCESS: 2,
//   ASB_DRAWER_KICK: 4,
//   ASB_BATTERY_OFFLINE: 4,
//   ASB_OFF_LINE: 8,
//   ASB_COVER_OPEN: 32,
//   ASB_PAPER_FEED: 64,
//   ASB_WAIT_ON_LINE: 256,
//   ASB_PANEL_SWITCH: 512,
//   ASB_MECHANICAL_ERR: 1024,
//   ASB_AUTOCUTTER_ERR: 2048,
//   ASB_UNRECOVER_ERR: 8192,
//   ASB_AUTORECOVER_ERR: 16384,
//   ASB_RECEIPT_NEAR_END: 131072,
//   ASB_RECEIPT_END: 524288
// }

export const ErrorCodes = {
  [ERROR_NETWORK]: {
    msg: 'Error de conexión con la impresora',
    key: ERROR_NETWORK
  },
  [ERROR_PARAMMETER]: { msg: 'Error de parámetros', key: ERROR_PARAMMETER },
  [ERROR_COMMAND]: { msg: 'Error de comando', key: ERROR_COMMAND },
  [ERROR_DEVICE_NOT_FOUND]: {
    msg: 'No se encuentra el dispositivo',
    key: ERROR_DEVICE_NOT_FOUND
  },
  [ERROR_DEVICE_BUSY]: { msg: 'Dispositivo ocupado', key: ERROR_DEVICE_BUSY },
  [ERROR_NOT_SUPPORTED]: { msg: 'Comando inválido', key: ERROR_NOT_SUPPORTED },
  [ERROR_COVER_OPEN]: { msg: 'Error, cierre la tapa', key: ERROR_COVER_OPEN },
  [ERROR_TIMEOUT]: { msg: 'Error de timeout', key: ERROR_TIMEOUT },
  [ERROR_AUTOMATICAL]: { msg: 'Error automático', key: ERROR_AUTOMATICAL },
  [ERROR_UNRECOVERABLE]: {
    msg: 'Error irrecuperable',
    key: ERROR_UNRECOVERABLE
  },
  [ERROR_BADPORT]: { msg: 'Error de puerto', key: ERROR_BADPORT },
  [SYSTEM_ERROR]: { msg: 'Error de sistema', key: SYSTEM_ERROR },
  [EPTR_CUTTER]: { msg: 'Error de cortador', key: EPTR_CUTTER },
  [EPTR_MECHANICAL]: { msg: 'Error mecánico', key: EPTR_MECHANICAL },
  [EPTR_REC_EMPTY]: { msg: 'Error, no hay rollo', key: EPTR_REC_EMPTY },
  [EPTR_SCHEMAERROR]: { msg: 'Error de schema', key: EPTR_SCHEMAERROR },
  [EPTR_PRINT_SYSTEM_ERROR]: {
    msg: 'Error de sistema',
    key: EPTR_PRINT_SYSTEM_ERROR
  }
}

export const WarningCodes = {
  [ASB_NO_RESPONSE]: { msg: 'La impresora no responde', key: ASB_NO_RESPONSE },
  [ASB_OFF_LINE]: { msg: 'La impresora está offline', key: ASB_OFF_LINE },
  [ASB_COVER_OPEN]: { msg: 'La tapa está abierta', key: ASB_COVER_OPEN },
  [ASB_PAPER_FEED]: {
    msg: 'La impresora esta alimentando papel',
    key: ASB_PAPER_FEED
  },
  [ASB_WAIT_ON_LINE]: {
    msg: 'Esperando recuperacion online',
    key: ASB_WAIT_ON_LINE
  },
  [ASB_PANEL_SWITCH]: { msg: 'Panel encendido', key: ASB_PANEL_SWITCH },
  [ASB_MECHANICAL_ERR]: { msg: 'Problema mecanico', key: ASB_MECHANICAL_ERR },
  [ASB_AUTOCUTTER_ERR]: {
    msg: 'El cortador no funciona',
    key: ASB_AUTOCUTTER_ERR
  },
  [ASB_UNRECOVER_ERR]: { msg: 'Error irrecuperable', key: ASB_UNRECOVER_ERR },
  [ASB_AUTORECOVER_ERR]: {
    msg: 'Error en auto recuperacion',
    key: ASB_AUTORECOVER_ERR
  },
  [ASB_RECEIPT_NEAR_END]: {
    msg: 'El rollo esta por acabarse',
    key: ASB_RECEIPT_NEAR_END
  },
  [ASB_RECEIPT_END]: { msg: 'Se acabó el papel', key: ASB_RECEIPT_END }
}

export const SuccessCode = {
  [ASB_PRINT_SUCCESS]: {
    msg: 'La impresora funciona correctamente',
    key: ASB_PRINT_SUCCESS
  }
}
