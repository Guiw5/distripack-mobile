import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, colors } from 'react-native-elements'
import { connect } from 'react-redux'
import { addToOrder, modifyOrder } from '../actions/index'
import ButtonFooter from './ButtonFooter'

class Details extends React.Component {
  constructor(props) {
    super(props)
    let { quantity, price } = this.props.navigation.state.params.item
    this.state = { quantity, price }
  }

  addToOrder = () => {
    let { state, goBack } = this.props.navigation
    let { product } = state.params.item
    this.props.addToOrder({ product, ...this.state })
    goBack()
  }

  modify = () => {
    let { state, goBack } = this.props.navigation
    let { product } = state.params.item
    this.props.modify({ product, ...this.state })
    goBack()
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

  render() {
    const { item, isNew } = this.props.navigation.state.params
    const { descripcion, cantidad } = item.product
    const { price, quantity } = this.state
    const subtotal = price * quantity

    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          alignContent: 'center',
          backgroundColor: '#FFF'
        }}
      >
        <ListItem
          title={descripcion}
          input={{
            defaultValue: '$' + this.state.price.toFixed(2),
            onEndEditing: this.priceChanged,
            inputStyle: { fontSize: 14, color: colors.primary },
            keyboardType: 'numeric'
          }}
          titleStyle={{ width: 270 }}
          containerStyle={{ borderBottomWidth: 0 }}
        />
        <ListItem
          subtitle="Cantidad por bulto"
          subtitleStyle={{ fontSize: 12 }}
          rightSubtitle={'' + cantidad}
        />
        <ListItem
          title="Indique cuantos bultos"
          titleStyle={{ fontSize: 14, width: 200 }}
          input={{
            onEndEditing: this.quantityChanged,
            placeholder: 'NRO',
            placeholderTextColor: colors.primary,
            inputStyle: { fontSize: 14, color: colors.primary },
            keyboardType: 'numeric'
          }}
        />
        <ListItem
          title="Subtotal"
          rightSubtitle={'$' + subtotal.toFixed(2)}
          titleStyle={{ fontSize: 14 }}
        />
        {isNew ? (
          <ButtonFooter title="Agregar al pedido" onPress={this.addToOrder} />
        ) : (
          <ButtonFooter title="Modificar" onPress={this.modify} />
        )}
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToOrder: item => {
      dispatch(addToOrder(item))
    },
    modify: item => {
      dispatch(modifyOrder(item))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Details)

const styles = StyleSheet.create({
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
