import React from 'react'
import { Alert } from 'react-native'
import moment from 'moment'

import Select from './Select'
import CheckAll from './CheckAll'
import CheckItem from './CheckItem'

export default class Recents extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: {}, all: false, delete: {} }
  }

  async componentDidMount() {
    await this.loadData()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.orders.length > 0 && this.props.orders.length === 0)
      return true

    if (nextProps.clients.length > 0 && this.props.clients.length === 0)
      return true

    if (this.props.printing && !nextProps.printing) return true

    if (this.state !== nextState) return true

    return false
  }

  loadData = async () => {
    if (!this.props.loadingClients && this.props.clients.length === 0)
      await this.props.loadClients()
    if (!this.props.loadingOrders && this.props.orders.length === 0)
      await this.props.loadOrders()
    if (
      !this.props.printing &&
      this.props.clients.length > 0 &&
      this.props.orders.length > 0
    )
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
      return { ...prevState, items: newState, delete: {} }
    })
  }

  onCheckDelete = item => () => {
    this.setState(prevState => {
      let newState = { ...prevState.delete }
      newState[item.id] = !prevState.delete[item.id]
      return { ...prevState, delete: newState, items: {} }
    })
  }

  onLongPress = item => () => {
    this.setState(prevState => {
      let newState = { ...prevState.delete }
      newState[item.id] = !prevState.delete[item.id]
      return { ...prevState, delete: newState, items: {}, all: false }
    })
  }

  isDelete = id => this.state.delete[id]

  renderItem = ({ item }) => (
    <CheckItem
      rightTitle={`${item.id}`}
      rightSubtitle={moment(item.deliveryDate).format('DD-MM')}
      title={item.client.nick}
      subtitle={item.client.mail}
      checked={
        this.anyToDelete()
          ? this.state.delete[item.id]
          : this.state.items[item.id]
      }
      onPress={this.onPress(item)}
      onLongPress={this.onLongPress(item)}
      isDeletion={this.isDelete(item.id)}
      onCheck={
        this.anyToDelete() ? this.onCheckDelete(item) : this.onCheck(item)
      }
      bottomDivider
      containerStyle={{ paddingVertical: 5 }}
    />
  )

  /**
   * if exists any order checked to delete,
   * there's no functionality for checkAll
   */
  onCheckAll = () => {
    if (this.anyToDelete()) return

    this.setState(prevState => ({
      ...prevState,
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

  deleteOrders = async () => {
    let orderIds = Object.keys(this.state.delete).filter(
      id => this.state.delete[id]
    )
    await this.props.deleteOrders(orderIds)
    this.setState({ delete: {} })
  }

  render() {
    return (
      <Select
        autoFocus={false}
        keyExtractor={item => `${item.id}`}
        placeholder="Escriba N° de control, alias o mail del cliente"
        filter={this.filter}
        data={this.props.orders}
        extraData={this.state}
        renderItem={this.renderItem}
        headerComponent={
          <CheckAll onPress={this.onCheckAll} checked={this.state.all} />
        }
        button={{
          buttonStyle: this.anyToDelete()
            ? { backgroundColor: '#db3838' }
            : null,
          disabled: !this.anyToPrint() && !this.anyToDelete(),
          title: this.anyToDelete() ? 'Anular Pedido' : 'Imprimir',
          onPress: this.anyToDelete() ? this.deleteOrders : this.printOrders,
          loading: this.anyToDelete()
            ? this.props.loadingOrders
            : this.props.printing
        }}
      />
    )
  }

  anyToDelete = () =>
    Object.values(this.state.delete).some(selected => selected)

  anyToPrint = () => Object.values(this.state.items).some(selected => selected)
}
