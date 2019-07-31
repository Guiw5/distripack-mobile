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

  componentWillReceiveProps(nextProps) {
    //check if was printing and the status was OK
    ResultsPrintAlert(nextProps.results, this.props.clearState)
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
      skuId: item.skuId,
      isUpdate: true
    })
  }

  renderItem = ({ item }) => {
    return (
      <OrderItem
        onlyRead={this.props.order.deliveredAt}
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
    else console.log(this.props.error)
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
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF'
        }}
      >
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

  print = () => this.props.print(this.props.order)

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
            loading={this.props.printing}
            onPress={this.print}
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
      return <ButtonFooter title="Volver" onPress={this.goBack} />

    //Si la orden se ha modificado => Modificar
    if (isUpdate && isUpdated)
      return (
        <ButtonFooter
          title="Modificar Pedido"
          titleStyle={{ fontWeight: '600' }}
          onPress={this.modify}
          loading={loading}
        />
      )

    //Si no es ninguna de la anteriores entonces hay items, y aun no se creó la orden
    return (
      <ButtonFooter
        title="Confirmar Pedido"
        loading={loading}
        onPress={this.create}
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
