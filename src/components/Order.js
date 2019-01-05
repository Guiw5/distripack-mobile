import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

import { ListView as OrderItems } from './ListView'
import OrderItem from './OrderItem'
import ButtonFooter from './ButtonFooter'
import OrderFooter from './OrderFooter'
import OrderTitle from './OrderTitle'

export default class Order extends Component {
  constructor(props) {
    super(props)
    this.state = { deleteMap: {} }
  }

  toDelete = skuId => !!this.state.deleteMap[skuId]

  onCheck = skuId => () => {
    this.setState(prevState => {
      let deleteMap = { ...prevState.deleteMap }
      deleteMap[skuId] = !prevState.deleteMap[skuId]
      return { deleteMap }
    })
  }
  onPress = item => () => {
    this.props.navigation.navigate('Details', {
      skuId: item.skuId
    })
  }

  renderItem = ({ item }) => {
    return (
      <OrderItem
        item={item}
        checked={this.toDelete(item.skuId)}
        onCheck={this.onCheck(item.skuId)}
        onPress={this.onPress(item)}
        onLongPress={this.onCheck(item.skuId)}
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

  goBack = () => this.props.navigation.goBack()

  goToClients = () => this.props.navigation.navigate('Clients')

  create = async () => {
    await this.props.create(this.props.order)
    if (!this.props.error) this.goToClients()
  }

  modify = async () => {
    await this.props.modify(this.props.order)
    if (!this.props.error) this.goBack()
  }

  getNick = () => (this.props.client ? this.props.client.nick : '')

  Subtotal = () => (
    <View style={styles.subtotalContainer}>
      <Text style={styles.subtotal}>{`$${this.getSubtotal().toFixed(2)}`}</Text>
      <Text>Total </Text>
    </View>
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <OrderTitle title={this.getNick()} nro={this.props.order.id} />
        <OrderItems
          containerStyle={{ flex: 0.7 }}
          initialNumToRender={this.props.order.items.length}
          data={this.props.order.items}
          extraData={this.state.deleteMap}
          keyExtractor={item => `${item.skuId}`}
          renderItem={this.renderItem}
          ListFooterComponent={this.Subtotal()}
        />
        <OrderFooter
          today={new Date()}
          addProducts={this.goToProducts}
          addDeliveryDate={this.props.setDeliveryDate}
          selectedDate={this.props.order.deliveryDate}
        />
        {this.renderButton(
          this.hasSelected(),
          this.props.isUpdate,
          this.props.order.items.length > 0
        )}
      </View>
    )
  }

  hasSelected = () =>
    Object.values(this.state.deleteMap).some(selected => selected)

  renderButton = (hasSelected, isUpdate, hasItems) => {
    if (hasSelected) {
      return (
        <ButtonFooter
          title="Eliminar Items"
          buttonStyle={{ backgroundColor: '#db3838' }}
          onPress={this.removeItems}
        />
      )
    }
    if (!hasItems) return <ButtonFooter title="Volver" onPress={this.goBack} />

    if (isUpdate) {
      return <ButtonFooter title="Modificar Pedido" onPress={this.modify} />
    }

    return <ButtonFooter title="Confirmar Pedido" onPress={this.create} />
  }
}

const styles = StyleSheet.create({
  subtotalContainer: {
    flexDirection: 'row-reverse',
    paddingVertical: 15,
    paddingRight: 10
  },
  subtotal: {
    color: '#42adb3',
    paddingHorizontal: 15,
    marginRight: 0
  }
})
