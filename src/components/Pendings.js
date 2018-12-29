import React from 'react'

import Select from './Select'
import SelectAll from './SelectAll'
import CheckItem from './CheckItem'
import moment from 'moment'

export default class Pendings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: {}, all: false }
  }

  componentDidMount() {
    this.props.loadOrders()
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

  getOrdersToDeliver() {
    let unselected = Object.values(this.state.items).some(selected => !selected)
    if (this.state.all && !unselected) return this.props.orders.map(o => o.id)

    let selected = Object.keys(this.state.items).filter(
      id => this.state.items[id]
    )
    return selected
  }

  deliverOrders = async () => {
    let orders = this.getOrdersToDeliver()
    await this.props.deliverOrders(orders)
  }

  render() {
    return (
      <Select
        keyExtractor={item => `${item.id}`}
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
          title: 'Entregar',
          onPress: this.deliverOrders,
          loading: this.props.loading
        }}
      />
    )
  }
}
