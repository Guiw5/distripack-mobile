import React from 'react'
import { View } from 'react-native'
import memoize from 'lodash/memoize'
import ListView from './ListView'
import OrderItem from './OrderItem'
import ButtonFooter from './ButtonFooter'
import OrderFooter from './OrderFooter'
import OrderTitle from './OrderTitle'

export default class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = { deleteMap: {} }
    this.onCheck = memoize(id => () => this.onCheckItem(id))
    this.onPress = memoize(item => () => this.goToDetails(item))
  }

  onCheckItem = skuId => {
    this.setState(prevState => {
      let deleteMap = { ...prevState.deleteMap }
      deleteMap[skuId] = !prevState.deleteMap[skuId]
      return { deleteMap }
    })
  }

  toDelete = skuId => !!this.state.deleteMap[skuId]

  goToDetails = item => {
    this.props.navigation.navigate('Details', { skuId: item.skuId })
  }

  renderItem = ({ item }) => {
    return (
      <OrderItem
        item={item}
        checked={this.toDelete(item.skuId)}
        onCheck={this.onCheck(item.skuId)}
        onPress={this.onPress(item)}
      />
    )
  }

  subtotal = x => x.quantity * x.price

  getSubtotal = () =>
    this.props.order.items.reduce((acc, x) => acc + this.subtotal(x), 0)

  goToProducts = () => this.props.navigation.navigate('Products')

  removeItems = () => {
    this.props.removeItems(this.state.deleteMap)
    this.setState({ deleteMap: {} })
  }

  goToClients = () => this.props.navigation.navigate('Clients')

  create = async () => {
    await this.props.create(this.props.order)
    if (!this.props.error) this.goToClients()
  }

  modify = async () => {
    await this.props.modify(this.props.order)
    if (!this.props.error) this.goToClients()
  }

  getNick = () => (this.props.client ? this.props.client.nick : '')

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <OrderTitle title={this.getNick()} />
        <ListView
          containerStyle={{ flex: 0.8 }}
          data={this.props.order.items}
          extraData={this.state.deleteMap}
          keyExtractor={item => `${item.skuId}`}
          renderItem={this.renderItem}
          ListFooterComponent={
            <OrderFooter
              error={this.props.error}
              subtotal={this.getSubtotal()}
              onPress={this.goToProducts}
            />
          }
        />
        {this.renderButton(this.hasSelected(), this.props.isUpdate)}
      </View>
    )
  }

  hasSelected = () =>
    Object.values(this.state.deleteMap).some(selected => selected)

  renderButton = (hasSelected, isUpdate) => {
    if (hasSelected) {
      return (
        <ButtonFooter
          title="Eliminar Seleccionados"
          buttonStyle={{ backgroundColor: '#db3838' }}
          onPress={this.removeItems}
        />
      )
    }
    if (isUpdate) {
      return <ButtonFooter title="Modificar Pedido" onPress={this.modify} />
    }
    return <ButtonFooter title="Confirmar Pedido" onPress={this.create} />
  }
}
