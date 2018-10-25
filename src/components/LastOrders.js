import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, CheckBox } from 'react-native-elements'
import * as epson from '../lib/epson'

import Select from './Select'
import { colors } from 'react-native-elements/src/config'

export default class LastOrders extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      all: false
    }
  }

  componentDidMount() {
    if (this.props.clientsLoaded.length === 0) this.props.loadClients()
    if (this.props.orders.length === 0) this.props.loadOrders()
  }

  filter = text => item =>
    item.mail.toLowerCase().includes(text.toLowerCase()) ||
    item.nick.toLowerCase().includes(text.toLowerCase())

  onPress = client => () => {
    let order = this.props.orders.find(o => o.clientId === client.id)
    this.props.setOrder(order)
    this.props.navigation.navigate('Order')
  }

  onCheck = item => () => {
    this.setState(prevState => {
      let newState = { ...prevState.items }
      newState[item.id] = !prevState.items[item.id]
      return { ...prevState, items: newState }
    })
    console.log('state onCheck', this.state)
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.nick}
      subtitle={item.mail}
      subtitleStyle={{ fontSize: 12 }}
      onPress={this.onPress(item)}
      containerStyle={{ borderBottomWidth: 0, paddingVertical: 10 }}
      leftElement={
        <CheckBox
          checked={this.state.items[item.id] || this.state.all}
          onPress={this.onCheck(item)}
          iconType="ionicon"
          uncheckedIcon="ios-square-outline"
          checkedIcon="ios-checkbox-outline"
          checkedColor="#42adb3"
          textStyle={styles.checkText}
          containerStyle={styles.checkContainer}
        />
      }
    />
  )

  printOrders = () => {
    console.log(this.state)
    var address =
      'http://192.168.0.3/cgi-bin/epos/service.cgi?devid=local_printer&timeout=6000'

    var builder = new epson.ePOSBuilder()
    builder.addTextAlign(builder.ALIGN_CENTER)
    builder.addText('hola soy fefo el maS TOPU DE LONGDONG\n')
    builder.addText('hola soy fefo el maS TOPU DE LONGDONG\n')
    builder.addText('hola soy fefo el maS TOPU DE LONGDONG\n')
    builder.addText('hola soy fefo el maS TOPU DE LONGDONG\n')
    builder.addText('hola soy fefo el maS TOPU DE LONGDONG\n')
    builder.addFeedUnit(20)
    builder.addTextFont(builder.FONT_A)
    builder.addTextAlign(builder.ALIGN_LEFT)
    builder.addText('10')
    builder.addText('\tBOBINA P/PAN/PP/AZ 40\t')
    builder.addText('\tBOBINA P/PAN/PP/AZ 40\t')
    builder.addText('\tBOBINA P/PAN/PP/AZ 40\t')
    builder.addTextAlign(builder.ALIGN_RIGHT)
    builder.addText('$960,00\n')
    builder.addFeed()
    builder.addCut(builder.CUT_FEED)

    var epos = new epson.ePOSPrint(address)
    epos.onreceive = function(res) {
      alert(res.success)
    }
    epos.onerror = function(err) {
      alert(err.status)
    }
    epos.oncoveropen = function() {
      alert('coveropen')
    }
    epos.send(builder.toString())
  }

  onCheckAll = () => {
    this.setState(prevState => ({
      ...prevState,
      all: !prevState.all
    }))
  }

  headerComponent = () => (
    <ListItem
      title="SELECCIONAR TODOS"
      containerStyle={{
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: colors.primary
      }}
      leftElement={
        <CheckBox
          checked={this.state.all}
          onPress={this.onCheckAll}
          iconType="ionicon"
          uncheckedIcon="ios-square-outline"
          checkedIcon="ios-checkbox-outline"
          checkedColor="#42adb3"
          textStyle={styles.checkText}
          containerStyle={styles.checkContainer}
        />
      }
    />
  )

  render() {
    return (
      <Select
        autoFocus={false}
        keyExtractor={item => item.mail}
        placeholder="Escriba alias o mail del cliente"
        filter={this.filter}
        data={this.props.clients}
        extraData={this.state.items}
        renderItem={this.renderItem}
        headerComponent={this.headerComponent}
        button={{
          disabled:
            !Object.values(this.state.items).some(selected => selected) &&
            !this.state.all,
          title: 'Imprimir',
          onPress: this.printOrders
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  checkText: {
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 0,
    paddingRight: 0
  },
  checkContainer: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    backgroundColor: 'transparent'
  }
})
