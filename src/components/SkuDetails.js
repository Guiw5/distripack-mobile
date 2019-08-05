import React from 'react'
import { StyleSheet, View } from 'react-native'
import ButtonFooter from './ButtonFooter'
import { Pills } from './Pills'
import { SkuInfo, SkuTitle, SkuSubtotal } from './SkuInfo'

export default class SkuDetails extends React.Component {
  constructor(props) {
    super(props)
    let { quantity, price } = this.props.item
    this.state = { quantity, price }
  }

  add = async () => {
    let { navigate } = this.props.navigation
    let { id, nick } = this.props.sku
    await this.props.add({ skuId: id, skuNick: nick, ...this.state })
    navigate('Products')
  }

  modify = async () => {
    let { navigate } = this.props.navigation
    let { index, skuId, price, quantity } = this.props.item
    if (price !== this.state.price || quantity !== this.state.quantity)
      await this.props.modify({ index, skuId, ...this.state })

    navigate('Order')
  }

  quantityChanged = event => {
    let value = event.nativeEvent.text.trim()
    if (!value) value = 1

    this.setState({ quantity: parseInt(value) })
  }

  priceChanged = event => {
    let value = event.nativeEvent.text.trim().replace('$', '')
    this.setState({ price: parseFloat(value) })
  }

  onMinusPress = name => {
    if (this.state[name] === 1) {
      return
    }

    this.setState(prevState => {
      return { ...prevState, [name]: prevState[name] - 1 }
    })
  }

  onPlusPress = name => {
    this.setState(prevState => {
      return { ...prevState, [name]: prevState[name] + 1 }
    })
  }

  render() {
    if (this.props.isLoading) return null

    const { sku, isUpdate } = this.props

    const {
      nick,
      brand,
      measures,
      capacity,
      color,
      description,
      quantity: skuQuantity,
      price: skuPrice
    } = sku
    const { price, quantity } = this.state
    const subtotal = price * quantity

    return (
      <View style={styles.containerStyle}>
        <SkuTitle title={nick} subtitle={`$${skuPrice.toFixed(2)}`} />
        <SkuInfo
          info={{
            1: [{ label: 'Descripción: ', value: description }],
            2: [
              { label: 'Marca: ', value: brand },
              { label: 'Medidas: ', value: measures },
              { label: 'Capacidad: ', value: capacity }
            ],
            3: [
              { label: 'Color: ', value: color },
              {
                label: '',
                value: `El precio incluye ${skuQuantity} ${
                  skuQuantity === 1 ? 'unidad' : 'unidades'
                }`
              }
            ]
          }}
        />
        <Pills
          title={'Indique el precio que desea utilizar:'}
          onMinusPress={() => this.onMinusPress('price')}
          onPlusPress={() => this.onPlusPress('price')}
          onTextChanged={this.priceChanged}
          value={`$${this.state.price}`}
        />
        <Pills
          title={'Indique cuántos bultos desea:'}
          onMinusPress={() => this.onMinusPress('quantity')}
          onPlusPress={() => this.onPlusPress('quantity')}
          onTextChanged={this.quantityChanged}
          value={`${this.state.quantity}`}
        />
        <SkuSubtotal value={`$${subtotal.toFixed(2)}`} />

        {isUpdate ? (
          <ButtonFooter title="Modificar Item" onPress={this.modify} />
        ) : (
          <ButtonFooter title="Agregar al pedido" onPress={this.add} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  button: {
    width: 300,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    height: 50,
    position: 'absolute',
    bottom: 5
  }
})
