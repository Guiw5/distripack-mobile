import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button, colors } from 'react-native-elements'
import { Separator } from '../commons'

export default class OrderFooter extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return this.props.error ? (
      <Text>Ups, hubo un error al confirmar la orden</Text>
    ) : (
      <View>
        <Separator />
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotal}>
            {`$${this.props.subtotal.toFixed(2)}`}
          </Text>
          <Text>Subtotal </Text>
        </View>
        <Button
          title="Agregar más productos"
          onPress={this.props.onPress}
          titleStyle={styles.btnTitle}
          buttonStyle={styles.btnProducts}
          containerStyle={{ paddingTop: 10, alignItems: 'center' }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnProducts: {
    width: 300,
    height: 45,
    backgroundColor: '#FFF',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5
  },
  btnTitle: {
    color: colors.primary,
    fontFamily: 'sans-serif-light'
  },
  subtotalContainer: {
    flex: 1,
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
