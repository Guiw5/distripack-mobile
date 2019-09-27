import React from 'react'
import moment from 'moment'

import Select from './Select'
import CheckAll from './CheckAll'
import CheckItem from './CheckItem'
import { myColors } from '../lib/commons'

export default class Pendings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: {}, all: false, delete: {} }
  }

  componentDidMount() {
    this.props.loadOrders()
  }

  filter = text => item =>
    item.id.toString().includes(text) ||
    item.client.email.toLowerCase().includes(text.toLowerCase()) ||
    item.client.nick.toLowerCase().includes(text.toLowerCase())

  onPress = item => () => {
    const { client, ...order } = item
    this.props.initOrder(client, order)
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
      subtitle={item.client.email}
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

  deliverOrders = async () => {
    let orderIds = Object.keys(this.state.items).filter(
      id => this.state.items[id]
    )
    await this.props.deliverOrders(orderIds)
    this.setState({ items: {}, all: false })
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
        placeholder="Escriba N° de control, alias o email del cliente"
        filter={this.filter}
        data={this.props.orders}
        onRefresh={this.props.loadOrders}
        refreshing={this.props.loading}
        extraData={this.state}
        renderItem={this.renderItem}
        headerComponent={
          <CheckAll onPress={this.onCheckAll} checked={this.state.all} />
        }
        button={{
          buttonStyle: this.anyToDelete()
            ? { backgroundColor: myColors.danger }
            : null,
          disabled: !this.anyToDeliver() && !this.anyToDelete(),
          title: this.anyToDelete() ? 'Anular Pedido' : 'Entregado',
          onPress: this.anyToDelete() ? this.deleteOrders : this.deliverOrders,
          loading: this.props.loading
        }}
      />
    )
  }

  anyToDelete = () =>
    Object.values(this.state.delete).some(selected => selected)

  anyToDeliver = () =>
    Object.values(this.state.items).some(selected => selected)
}
