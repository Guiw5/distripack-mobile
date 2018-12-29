import React from 'react'
import { Alert } from 'react-native'

import Select from './Select'
import SelectAll from './SelectAll'
import CheckItem from './CheckItem'
import moment from 'moment'

export default class Recents extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { items: {}, all: false }
  }

  async componentDidMount() {
    await this.loadData()
  }

  componentDidUpdate() {
    console.log('pasamos por aca??', this.props.printState)
    if (this.props.printState === 'ok') {
      Alert.alert('Excelente', 'Los pedidos fueron impresos correctamente')
    }

    if (this.props.printState === 'notok') {
      Alert.alert('Ups', 'No se ha podido imprimir, intente de nuevo')
    }
  }

  loadData = async () => {
    await this.props.loadClients()
    await this.props.loadOrders()
    await this.props.checkPrinterStatus()
  }

  filter = text => item =>
    item.id.toString().includes(text) ||
    item.client.mail.toLowerCase().includes(text.toLowerCase()) ||
    item.client.nick.toLowerCase().includes(text.toLowerCase())

  onPress = order => () => {
    let { id, items, deliveryDate, clientId, createdAt } = order
    this.props.setOrder({
      id,
      items,
      clientId,
      deliveryDate,
      createdAt
    })
    this.props.navigation.navigate('Order')
  }

  onCheck = item => () => {
    this.setState(prevState => {
      let newState = { ...prevState.items }
      newState[item.id] = !prevState.items[item.id]
      return { ...prevState, items: newState }
    })
  }

  renderItem = ({ item }) => (
    <CheckItem
      rightTitle={`Nro:  ${item.id}`}
      rightSubtitle={moment(item.deliveryDate).format('DD-MM')}
      title={item.client.nick}
      subtitle={item.client.mail}
      checked={this.state.items[item.id]}
      onPress={this.onPress(item)}
      onCheck={this.onCheck(item)}
      bottomDivider
      containerStyle={{ paddingVertical: 5 }}
    />
  )

  onCheckAll = () => {
    this.setState(prevState => ({
      items: prevState.all ? {} : this.orderIdsMap(this.props.orders),
      all: !prevState.all
    }))
  }

  orderIdsMap = orders => {
    return orders.reduce((items, order) => {
      items[order.id] = true
      return items
    }, {})
  }

  getOrdersToPrint() {
    let unselected = Object.values(this.state.items).some(selected => !selected)
    if (this.state.all && !unselected) return this.props.orders

    let selected = Object.keys(this.state.items).filter(
      id => this.state.items[id]
    )
    return this.props.orders.filter(o => selected.includes(`${o.id}`))
  }

  printOrders = async () => {
    let orders = this.getOrdersToPrint()
    await this.props.printOrders(orders)
  }

  render() {
    console.log('son muchos renders?', this.props.printState)
    return (
      <Select
        autoFocus={false}
        keyExtractor={item => item.client.mail}
        placeholder="Escriba N° de control, alias o mail del cliente"
        filter={this.filter}
        data={this.props.orders}
        extraData={this.state.items}
        renderItem={this.renderItem}
        headerComponent={
          <SelectAll onPress={this.onCheckAll} checked={this.state.all} />
        }
        button={{
          disabled: !Object.values(this.state.items).some(selected => selected),
          title: 'Imprimir',
          onPress: this.printOrders,
          loading: this.props.printing
        }}
      />
    )
  }
}
