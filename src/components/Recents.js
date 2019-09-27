import React from 'react'
import moment from 'moment'

import Select from './Select'
import CheckAll from './CheckAll'
import CheckItem from './CheckItem'
import { myColors } from '../lib/commons'
import PrintAlert from './PrintAlert'

export default class Recents extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: {}, all: false, delete: {} }
  }

  componentDidMount() {
    this.loadData()
  }

  componentWillReceiveProps(nextProps) {
    //check if was printing and the status was OK
    //check if was printing and the status was OK
    if (
      this.props.printing &&
      !nextProps.printing &&
      nextProps.results &&
      nextProps.results !== this.props.results
    )
      PrintAlert(nextProps.results, this.props.clearState)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.printing !== nextProps.printing) return true

  //   if (nextProps.results && nextProps.results === this.props.results)
  //     return false

  //   console.log('nextState', nextState)

  //   //new ones
  //   if (nextProps.orders.length > 0 && this.props.orders.length === 0)
  //     return true

  //   //updated ones
  //   if (nextProps.orders.length > 0 && this.props.orders.length > 0) {
  //     if (nextProps.orders.length !== this.props.orders.length) return true

  //     let hasItemUpdates = this.props.orders.some(o => {
  //       let nextOrder = nextProps.orders.find(n => n.id === o.id)
  //       return (
  //         o.deliveryDate !== nextOrder.deliveryDate ||
  //         o.items.length !== nextOrder.items.length ||
  //         o.items.some(item => {
  //           let nextItem = nextOrder.items.find(n => n.id === item.id)
  //           if (!nextItem) return true
  //           return (
  //             nextItem.price !== item.price ||
  //             nextItem.quantity !== item.quantity
  //           )
  //         })
  //       )
  //     })
  //     if (hasItemUpdates) return true
  //   }

  //   return false
  // }

  loadData = () => {
    if (!this.props.loadingOrders && this.props.orders.length === 0)
      this.props.loadOrders()

    if (!this.props.printing && this.props.orders.length > 0)
      this.props.getStatus()
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
      return {
        ...prevState,
        delete: newState,
        items: {},
        all: false
      }
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
      onPress={
        (this.anyToDelete() && this.onCheckDelete(item)) ||
        (this.anyToPrint() && this.onCheck(item)) ||
        this.onPress(item)
      }
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
    // try {
    await this.props.printOrders(orders)
    // } catch (error) {
    //   console.log(error)
    // }
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
    let btnProps = this.getButtonProps(this.anyToDelete(), this.anyToPrint())
    return (
      <Select
        autoFocus={false}
        keyExtractor={item => `${item.id}`}
        placeholder="Escriba N° de control, alias o email del cliente"
        filter={this.filter}
        data={this.props.orders}
        refreshing={this.props.loadingOrders}
        onRefresh={this.props.loadOrders}
        extraData={this.state}
        renderItem={this.renderItem}
        headerComponent={
          <CheckAll onPress={this.onCheckAll} checked={this.state.all} />
        }
        button={btnProps}
      />
    )
  }

  anyToDelete = () =>
    Object.values(this.state.delete).some(selected => selected)

  anyToPrint = () => Object.values(this.state.items).some(selected => selected)

  getButtonProps = (anyToDelete, anyToPrint) => {
    if (anyToDelete) {
      return {
        buttonStyle: { backgroundColor: myColors.danger },
        title: 'Anular Pedido',
        onPress: this.deleteOrders,
        loading: this.props.loadingOrders
      }
    }
    if (!anyToDelete && anyToPrint) {
      return {
        title: 'Imprimir',
        onPress: this.printOrders,
        loading: this.props.printing
      }
    }
    if (!anyToDelete && !anyToPrint) {
      return {
        title: 'Nuevo Pedido',
        onPress: () => this.props.navigation.navigate('Clients')
      }
    }
    return nulll
  }
}
