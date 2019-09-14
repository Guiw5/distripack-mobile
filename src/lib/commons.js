import React from 'react'
import { View, StyleSheet } from 'react-native'
import XDate from 'xdate'
import { xdateToData } from 'react-native-calendars/src/interface'
import { LocaleConfig } from 'react-native-calendars'

LocaleConfig.locales['ar'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sept',
    'Oct',
    'Nov',
    'Dic'
  ],
  dayNames: [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado'
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
}

LocaleConfig.defaultLocale = 'ar'

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase()
}

String.prototype.toProperCase = function() {
  return this.replace(/\w\S*/g, text => text.capitalize())
}

String.prototype.contains = function(str) {
  return this.indexOf(str) != -1
}

Array.prototype.toDictionary = function(keyGenerator = el => el.id) {
  this.reduce((dict, el) => {
    dict[keyGenerator(el)] = el
    return dict
  }, {})
}

export const deliveryDayString = (selectedDate, today) => {
  let selected = getSelected(selectedDate)
  let diffMonths = selected.month - (today.getMonth() + 1)
  let diffDays = selected.day - today.getDate()
  let date = XDate(selected.dateString)

  if (diffMonths === 0) {
    if (diffDays === 0) return 'Entregar Hoy'
    if (diffDays === 1) return 'Entregar Mña'
    if (diffDays > 1 && diffDays < 8) {
      return 'Próximo ' + date.toString('dddd')
    }
  }
  return 'Para el ' + date.toString('dddd') + ' ' + date.toString('dd')
}

export const getSelected = selected => {
  if (!selected) selected = new Date()
  return xdateToData(XDate(selected, true))
}

export const shallowCompare = (obj1, obj2) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => obj1[key] === obj2[key])

export const Separator = () => <View style={style.separator} />

export const myColors = {
  primary: '#2089dc',
  primaryBg: '#2089dc20',
  green: '#42adb3',
  greenBg: '#42adb320',
  danger: '#db3838',
  dangerBg: '#db383820',
  grey0: '#393e42',
  grey1: '#43484d',
  grey2: '#5e6977',
  grey3: '#86939e',
  grey4: '#bdc6cf',
  grey5: '#e1e8ee'
}
const style = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#CED0CE'
  }
})
