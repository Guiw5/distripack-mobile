import React from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { myColors, deliveryDayString, getSelected } from '../lib/commons'
import { Calendar } from 'react-native-calendars'

export default class OrderFooter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showCalendar: false, showNotes: false }
  }

  toogleCalendar = () => {
    this.setState(prevState => ({
      showCalendar: !prevState.showCalendar
    }))
  }

  onDayPress = async selected => {
    let date = new Date(selected.timestamp)
    await this.props.addDeliveryDate(date)
    this.toogleCalendar()
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
          title={deliveryDayString(this.props.selectedDate, this.props.today)}
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
            current={this.props.today}
            minDate={this.props.today}
            onDayPress={this.onDayPress}
            markedDates={{
              [getSelected(this.props.selectedDate).dateString]: {
                selected: true
              }
            }}
          />
        </Modal>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  btnProducts: {
    width: 300,
    height: 45,
    backgroundColor: '#FFF',
    borderColor: myColors.primary,
    borderWidth: 1,
    borderRadius: 5
  },
  btnTitle: {
    color: myColors.primary,
    fontFamily: 'sans-serif-light'
  }
})
