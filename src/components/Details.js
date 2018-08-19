import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, colors } from 'react-native-elements'
import { connect } from 'react-redux'
import actions from '../store/actions'
import ButtonFooter from './ButtonFooter'
import selectors from '../store/selectors'

const editIconProps = {
  type: 'materialIcons',
  name: 'edit',
  color: colors.primary,
  size: 20
}

class Details extends React.Component {
  constructor(props) {
    super(props)
    let { quantity, price } = this.props.item
    this.state = { quantity, price }
  }

  addToOrder = () => {
    let { navigate } = this.props.navigation
    let { id, nick } = this.props.sku
    this.props.addToOrder({ skuId: id, skuNick: nick, ...this.state })
    navigate('Products')
  }

  modify = () => {
    let { navigate } = this.props.navigation
    let { skuId, price, quantity } = this.props.item
    if (price !== this.state.price || quantity !== this.state.quantity)
      this.props.modify({ skuId, ...this.state })

    navigate('Products')
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
    const { sku, isUpdate } = this.props
    const { nick, description, quantity: skuQuantity } = sku
    const { price, quantity } = this.state
    const subtotal = price * quantity

    return (
      <View style={styles.containerStyle}>
        <ListItem
          title={nick}
          containerStyle={styles.containerList}
          input={{
            ref: ref => (this.priceInput = ref),
            defaultValue: '$' + this.state.price.toFixed(2),
            onEndEditing: this.priceChanged,
            selectTextOnFocus: true,
            inputStyle: { fontSize: 14, color: colors.primary },
            keyboardType: 'numeric',
            containerStyle: { flex: 0.3 }
          }}
          rightIcon={editIconProps}
          onPress={() => this.priceInput.focus()}
        />
        <ListItem title={description.toProperCase()} />
        <ListItem
          title={'Cantidad por bulto: ' + skuQuantity}
          titleStyle={{ fontSize: 12 }}
        />
        <ListItem
          title="Indique cuantos bultos"
          titleStyle={{ fontSize: 14 }}
          containerStyle={{
            borderRadius: 10,
            borderColor: colors.primary,
            borderWidth: 1
          }}
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
          rightIcon={editIconProps}
          onPress={() => this.quantInput.focus()}
        />

        <ListItem
          title="Subtotal"
          rightSubtitle={'$' + subtotal.toFixed(2)}
          titleStyle={{ fontSize: 14 }}
        />
        {isUpdate ? (
          <ButtonFooter title="Modificar" onPress={this.modify} />
        ) : (
          <ButtonFooter title="Agregar al pedido" onPress={this.addToOrder} />
        )}
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let skuId = ownProps.navigation.getParam('skuId')
  let isUpdate = selectors.getItemFromOrder(state, skuId)
  let skus = selectors.getSkusMap(state)
  let sku = skus[skuId]
  let item = isUpdate ? isUpdate : { skuId, quantity: 1, price: sku.price }
  return { isUpdate, sku, item }
}

const mapDispatchToProps = dispatch => {
  return {
    addToOrder: item => {
      dispatch(actions.addToOrder(item))
    },
    modify: item => {
      dispatch(actions.modifyOrder(item))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details)

const styles = StyleSheet.create({
  containerList: {
    borderBottomWidth: 1,
    justifyContent: 'space-around'
  },
  containerStyle: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#FFF'
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
