import React from 'react'

import Select from './Select'
import SelectAll from './SelectAll'
import CheckItem from './CheckItem'

export default class ToPrint extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { items: {}, all: false }
  }

  async componentDidMount() {
    await this.loadData()
  }

  loadData = async () => {
    await this.props.loadClients()
    await this.props.loadOrders()
  }

  filter = text => item =>
    item.client.mail.toLowerCase().includes(text.toLowerCase()) ||
    item.client.nick.toLowerCase().includes(text.toLowerCase())

  onPress = order => () => {
    this.props.setOrder({
      id: order.id,
      items: order.items,
      clientId: order.clientId
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
      title={item.client.nick}
      subtitle={item.client.mail}
      checked={this.state.items[item.id]}
      onPress={this.onPress(item)}
      onCheck={this.onCheck(item)}
      bottomDivider
      containerStyle={{ paddingVertical: 5 }}
    />
  )

  printOrders = async () => {
    let orders = this.getOrdersToPrint()
    await this.props.printOrders(orders)
  }

  onCheckAll = () => {
    this.setState(prevState => ({
      items: prevState.all ? {} : this.orderIdsMap(),
      all: !prevState.all
    }))
  }

  onStatusPress = key => {
    this.props.clearStatus(key)
  }

  orderIdsMap = () => {
    return this.props.orders.reduce((items, order) => {
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

  render() {
    console.log('son muchos renders?')
    return (
      <Select
        autoFocus={false}
        keyExtractor={item => item.client.mail}
        placeholder="Escriba alias o mail del cliente"
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
