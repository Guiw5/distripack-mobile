import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, ButtonGroup } from 'react-native-elements'
import ButtonFooter from './ButtonFooter'
import { myColors } from '../lib/commons'

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

  render() {
    if (this.props.isLoading) return null

    const { sku, isUpdate } = this.props
    const brand = 'Cellpack',
      measures = '20x30',
      capacity = '1kg',
      color = 'amarillo'

    const { nick, price: skuPrice, description, quantity: skuQuantity } = sku
    const { price, quantity } = this.state
    const subtotal = price * quantity
    return (
      <View style={styles.containerStyle}>
        {/* <ListItem
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
        /> */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '800' }}>{nick}</Text>
          <Text h4>{`$${skuPrice.toFixed(2)}`}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 100
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{'Descripción: '}</Text>
            <Text>{description}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>{'Marca: '}</Text>
              <Text>{brand ? brand : 'NS/NC'}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>{'Medidas: '}</Text>
              <Text>{measures ? measures : 'NS/NC'}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>{'Capacidad: '}</Text>
              <Text>{capacity ? capacity : 'NS/NC'}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>{'Color: '}</Text>
              <Text>{color ? color : 'NS/NC'}</Text>
            </View>
            <View>
              <Text>{`Un bulto incluye ${skuQuantity} ${
                skuQuantity === 1 ? 'unidad' : 'unidades'
              }`}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>
            {'Indique cantidad de bultos:'}
          </Text>
          <ButtonGroup buttons={['-', '5', '+']} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{'Indique el precio:'}</Text>
          <ButtonGroup buttons={['-', '5', '+']} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 80
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              minWidth: 150
            }}
          >
            <Text style={{ fontSize: 16 }}>{'Subtotal:'}</Text>
            <Text style={{ fontSize: 16, color: myColors.green }}>
              {`$${subtotal.toFixed(2)}`}
            </Text>
          </View>
        </View>
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
