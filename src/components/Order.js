import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'

import { ListView as OrderItems } from './ListView'
import OrderItem from './OrderItem'
import ButtonFooter from './ButtonFooter'
import OrderFooter from './OrderFooter'
import OrderTitle from './OrderTitle'
import DeliveredNote from './DeliveredNote'
import ResultsPrintAlert from './ResultsPrintAlert'

import { myColors } from '../lib/commons'

export default class Order extends Component {
  constructor(props) {
    super(props)
    this.state = { deleteMap: {} }
  }

  shouldComponentUpdate(nextProps) {
    //if the order was cleaned
    if (this.props.order && !nextProps.order) return false

    if (nextProps.results && nextProps.results === this.props.results)
      return false

    return true
  }

  componentWillReceiveProps(nextProps) {
    //check if was printing and the status was OK
    if (
      this.props.printing &&
      !nextProps.printing &&
      nextProps.results &&
      nextProps.results !== this.props.results
    )
      ResultsPrintAlert(nextProps.results, this.props.clearState)
  }

  toDelete = index => !!this.state.deleteMap[index]

  onCheck = index => () => {
    this.setState(prevState => {
      let deleteMap = { ...prevState.deleteMap }
      deleteMap[index] = !prevState.deleteMap[index]
      return { deleteMap }
    })
  }

  onPress = ({ skuId, price, quantity }, index) => () => {
    let item = { skuId, price, quantity, index }
    this.props.navigation.navigate({
      routeName: 'Details',
      params: { item, isUpdate: true }
    })
  }

  renderItem = ({ item, index }) => {
    return (
      <OrderItem
        onlyRead={this.props.order.deliveredAt}
        item={item}
        checked={this.toDelete(index)}
        onCheck={this.onCheck(index)}
        onPress={this.onPress(item, index)}
        onLongPress={this.onCheck(index)}
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

  goTo = state => {
    if (state === 'Created') this.props.navigation.navigate('Recents')

    if (state === 'Printed') this.props.navigation.navigate('Pendings')

    if (state === 'Delivered') this.props.navigation.navigate('Delivered')
  }

  goToClients = () => this.props.navigation.navigate('Clients')

  create = order => async () => {
    await this.props.create(order)
    this.goToClients()
  }

  modify = order => async () => {
    await this.props.modify(order)
    this.goTo(order.state)
  }

  getNick = () => (this.props.client ? this.props.client.nick : '')

  getNumber = () => (this.props.order.id ? this.props.order.id : '-')

  Subtotal = () => (
    <View style={styles.subtotalContainer}>
      <Text style={styles.subtotal}>{`$${this.getSubtotal().toFixed(2)}`}</Text>
      <Text>Total </Text>
    </View>
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <OrderTitle title={this.getNick()} nro={this.getNumber()} />
        <OrderItems
          containerStyle={{ flex: 0.7 }}
          initialNumToRender={this.props.order.items.length}
          data={this.props.order.items}
          extraData={this.state.deleteMap}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderItem}
          ListFooterComponent={this.Subtotal()}
        />
        {this.renderFooter(this.props.order.deliveredAt)}
        {this.renderButton(
          this.props.order.deliveredAt,
          this.hasSelected(this.state.deleteMap),
          this.props.isUpdate,
          this.props.isUpdated,
          this.props.loading,
          this.props.order.items.length > 0
        )}
      </View>
    )
  }

  print = () => {
    if (this.props.order.state.toLowerCase() === 'created')
      this.props.print(this.props.order)
    else this.props.reprint(this.props.order)
  }

  renderFooter = deliveredAt => {
    if (deliveredAt) return <DeliveredNote deliveredAt />

    return (
      <View>
        <OrderFooter
          today={new Date()}
          addProducts={this.goToProducts}
          addDeliveryDate={this.props.setDeliveryDate}
          selectedDate={this.props.order.deliveryDate}
        />
        {this.props.isUpdate && (
          <Button
            title={
              this.props.order.state === 'Created' ? 'Imprimir' : 'Reimprimir'
            }
            onPress={this.print}
            loading={this.props.printing}
            loadingProps={{ color: myColors.primary }}
            titleStyle={styles.btnTitle}
            buttonStyle={styles.btnProducts}
            containerStyle={{
              paddingTop: 10,
              alignItems: 'center'
            }}
          />
        )}
      </View>
    )
  }

  hasSelected = map => Object.values(map).some(selected => selected)

  /**
   * Tendria que checkear order.state ==="printed" => btnVolver
   * Y habria que agregar un btn de Saldo Anterior?? y Entregado?
   */
  renderButton = (
    deliveredAt,
    hasSelected,
    isUpdate,
    isUpdated,
    loading,
    hasItems
  ) => {
    //Si hay items para eliminar => btn de eliminar
    if (hasSelected) {
      return (
        <ButtonFooter
          title="Eliminar Items"
          buttonStyle={{
            backgroundColor: myColors.danger
          }}
          onPress={this.removeItems}
        />
      )
    }
    //Si la orden no tiene items, ya se ha entregado, o no se ha modificado aun => volver
    if (!hasItems || deliveredAt || (isUpdate && !isUpdated))
      return (
        <ButtonFooter title="Volver" loading={loading} onPress={this.goBack} />
      )

    //Si la orden se ha modificado => Modificar
    if (isUpdate && isUpdated)
      return (
        <ButtonFooter
          title="Modificar Pedido"
          titleStyle={{ fontWeight: '600' }}
          onPress={this.modify(this.props.order)}
          loading={loading}
        />
      )

    //Si no es ninguna de la anteriores entonces hay items, y aun no se creó la orden
    return (
      <ButtonFooter
        title="Confirmar Pedido"
        loading={loading}
        onPress={this.create(this.props.order)}
      />
    )
  }
}

const styles = StyleSheet.create({
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
  },
  subtotalContainer: {
    flexDirection: 'row-reverse',
    paddingVertical: 15,
    paddingRight: 10
  },
  subtotal: {
    color: myColors.green,
    paddingHorizontal: 15,
    marginRight: 0
  }
})
