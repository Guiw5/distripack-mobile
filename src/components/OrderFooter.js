import React from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import { Text, Button, colors, Input } from 'react-native-elements'
import XDate from 'xdate'
import { xdateToData, parseDate } from 'react-native-calendars/src/interface'
import { Calendar, LocaleConfig } from 'react-native-calendars'

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

export default class OrderFooter extends React.Component {
  constructor(props) {
    super(props)
    this.today = XDate.today()
    this.state = { showCalendar: false, showNotes: false }
  }

  toogleCalendar = () => {
    this.setState(prevState => ({
      showCalendar: !prevState.showCalendar
    }))
  }

  dayString = selectedDate => {
    let selected = this.getSelected(selectedDate)
    let diffMonths = selected.month - (this.today.getMonth() + 1)
    let diffDays = selected.day - this.today.getDate()
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

  onDayPress = async selected => {
    let date = new Date(selected.timestamp)
    await this.props.addDeliveryDate(date)
    this.toogleCalendar()
  }

  getSelected = selectedDate => {
    if (!selectedDate) selectedDate = new Date()
    let selected = xdateToData(XDate(selectedDate, true))
    return selected
  }

  render() {
    return (
      <View>
        <Button
          title="Agregar más productos"
          onPress={this.props.addProducts}
          titleStyle={styles.btnTitle}
          buttonStyle={styles.btnProducts}
          containerStyle={{ paddingTop: 10, alignItems: 'center' }}
        />
        <Button
          title={this.dayString(this.props.selectedDate)}
          onPress={this.toogleCalendar}
          titleStyle={styles.btnTitle}
          buttonStyle={styles.btnProducts}
          containerStyle={{ paddingTop: 10, alignItems: 'center' }}
        />
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.showCalendar}
          onRequestClose={() => {}}
        >
          <Calendar
            style={{ marginTop: 100, height: 500 }}
            current={this.today}
            minDate={this.today}
            onDayPress={this.onDayPress}
            markedDates={{
              [this.getSelected(this.props.selectedDate).dateString]: {
                selected: true
              }
            }}
          />
        </Modal>
      </View>
    )
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
