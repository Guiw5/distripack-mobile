import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Text, Input } from 'react-native-elements'
import ButtonFooter from './ButtonFooter'
import { myColors } from '../lib/commons'

const editIconProps = {
  type: 'materialIcons',
  name: 'edit',
  color: myColors.primary,
  size: 20
}

export default class Details extends React.Component {
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
    let { skuId, price, quantity } = this.props.item
    if (price !== this.state.price || quantity !== this.state.quantity)
      await this.props.modify({ skuId, ...this.state })

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

  render() {
    if (this.props.isLoading) return <View />

    const { sku, isUpdate } = this.props
    const { nick, description, quantity: skuQuantity } = sku
    const { price, quantity } = this.state
    const subtotal = price * quantity
    return (
      <View style={styles.containerStyle}>
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}
        >
          <Text>Alias:</Text>
          <Input value={nick} />
        </View>
        <ListItem
          title={`Alias: ${nick}`}
          containerStyle={styles.containerList}
          input={{
            ref: ref => (this.priceInput = ref),
            defaultValue: `$${this.state.price.toFixed(2)}`,
            onEndEditing: this.priceChanged,
            selectTextOnFocus: true,
            inputStyle: { fontSize: 14, color: myColors.primary },
            keyboardType: 'numeric',
            containerStyle: { flex: 0.3 }
          }}
          rightIcon={editIconProps}
          onPress={() => this.priceInput.focus()}
        />
        <ListItem title={`Descripción: ${description.toProperCase()}`} />
        <ListItem
          title={'Unidades por bulto: ' + skuQuantity}
          titleStyle={{ fontSize: 12 }}
        />
        <ListItem
          title="Cantidad de bultos"
          titleStyle={{ fontSize: 14, color: myColors.primary }}
          input={{
            ref: ref => (this.quantInput = ref),
            onEndEditing: this.quantityChanged,
            defaultValue: '' + this.state.quantity,
            placeholderTextColor: myColors.primary,
            selectTextOnFocus: true,
            containerStyle: { flex: 0.3 },
            inputStyle: { fontSize: 14, color: myColors.primary },
            keyboardType: 'numeric'
          }}
          rightIcon={editIconProps}
          onPress={() => this.quantInput.focus()}
        />
        <ListItem
          title="Subtotal"
          rightSubtitle={`$${subtotal.toFixed(2)}`}
          titleStyle={{ fontSize: 14 }}
        />
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
