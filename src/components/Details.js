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
    // let focus = false
    this.state = { quantity, price }
  }
  // componentDidMount() {
  //   if (this.state.focus) this..input.focus()
  // }
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
    const { alias, descripcion, cantidad } = item.product
    const { price, quantity } = this.state
    const subtotal = price * quantity

    return (
      <View
        style={{ flex: 1, alignContent: 'center', backgroundColor: '#FFF' }}
      >
        <ListItem
          title={alias}
          subtitle={descripcion}
          containerStyle={{
            borderBottomWidth: 1,
            justifyContent: 'space-around'
          }}
          input={{
            ref: ref => (this.priceInput = ref),
            defaultValue: '$' + this.state.price.toFixed(2),
            onEndEditing: this.priceChanged,
            selectTextOnFocus: true,
            inputStyle: { fontSize: 14, color: colors.primary },
            keyboardType: 'numeric',
            containerStyle: { flex: 0.3 }
          }}
          rightIcon={{
            type: 'materialIcons',
            name: 'edit',
            color: colors.primary,
            size: 20,
            containerStyle: { paddingRight: 0, marginRight: 0 }
          }}
          rightContentContainerStyle={{ backgroundColor: 'yellow' }}
          onPress={() => this.priceInput.focus()}
        />
        <ListItem
          title={'Cantidad por bulto: ' + cantidad}
          titleStyle={{ fontSize: 12 }}
        />
        <ListItem title={'Capacidad: 200cc'} titleStyle={{ fontSize: 12 }} />
        <ListItem title={'Color: blanco'} titleStyle={{ fontSize: 12 }} />
        <ListItem title={'Medidas: no tiene'} titleStyle={{ fontSize: 12 }} />
        <ListItem
          title="Indique cuantos bultos"
          titleStyle={{ fontSize: 14 }}
          input={{
            ref: ref => (this.quantInput = ref),
            onEndEditing: this.quantityChanged,
            defaultValue: '' + this.state.quantity,
            placeholderTextColor: colors.primary,
            selectTextOnFocus: true,
            containerStyle: { flex: 0.3 },
            inputStyle: { fontSize: 14, color: colors.primary },
            keyboardType: 'numeric'
          }}
          rightIcon={{
            type: 'materialIcons',
            name: 'edit',
            color: colors.primary,
            size: 20
          }}
          onPress={() => this.quantInput.focus()}
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
