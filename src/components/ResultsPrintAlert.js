import { Alert } from 'react-native'

const ResultsPrintAlert = (results, onPress) => {
  if (results === 'ok') {
    Alert.alert('Excelente', 'La impresión se ha realizado correctamente', [
      { text: 'Ok', onPress: onPress }
    ])
  }
  //check if the status was NOTOK
  if (results === 'notok') {
    Alert.alert('Ups', 'No se ha podido imprimir, intente de nuevo mas tarde', [
      { text: 'Ok', onPress: onPress }
    ])
  }
}
export default ResultsPrintAlert
