import React, { Component } from 'react'
import { findNodeHandle, View, StyleSheet } from 'react-native'
import XDate from 'xdate'
import { xdateToData } from 'react-native-calendars/src/interface'
import { Calendar, LocaleConfig } from 'react-native-calendars'

import { Button, Input } from 'react-native-elements'
import { colors } from 'react-native-elements/src/config'

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

// export default class OrderDate extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { showCalendar: false }
//   }

//   showCalendar = () => {
//     this.setState(prevState => ({
//       showCalendar: !prevState.showCalendar
//     }))
//   }

// showCalendar = () => {
//   this.setState(prevState => ({
//     showCalendar: !prevState.showCalendar
//   }))
// }

// onDayPress = selected => {
//   this.setState({
//     selected,
//     showCalendar: false
//   })
// }

//   // dayString = selected => {
//   //   let diffMonths = selected.month - (this.props.today.getMonth() + 1)
//   //   let diffDays = selected.day - this.props.today.getDate()
//   //   let date = XDate(selected.dateString)

//   //   if (diffMonths === 0) {
//   //     if (diffDays === 0) return 'Entregar Hoy'
//   //     if (diffDays === 1) return 'Entregar Mña'
//   //     if (diffDays > 1 && diffDays < 8) {
//   //       return 'Próximo ' + date.toString('dddd')
//   //     }
//   //   }
//   //   return 'Para el ' + date.toString('dddd') + ' ' + date.toString('dd')
//   // }
//   //this.dayString(this.state.selected)

//   render() {
//     return (
//       <View>
//         <Button
//           title={'holaaaaa'}
//           onPress={this.showCalendar}
//           titleStyle={styles.btnTitle}
//           buttonStyle={styles.btnProducts}
//           containerStyle={{ paddingTop: 10, alignItems: 'center' }}
//         />
//         {this.state.showCalendar ? (
//           <MyCalendar today={this.props.today} />
//         ) : null}
//       </View>
//     )
//   }
// }

export default class MyCalendar extends PureComponent {
  constructor(props) {
    super(props)
    // this.calendar = null
  }

  // componentDidMount() {
  //   console.log(this.calendar)
  //   if (this.calendar) {
  //     this.calendar.focus()
  //   }
  // }

  render() {
    return <View />
  }
}
const styles = StyleSheet.create({
  btnProducts: {
    width: 300,
    height: 45,
    backgroundColor: '#FFF',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5
  },
  btnTitle: {
    color: colors.primary,
    fontFamily: 'sans-serif-light'
  }
})
