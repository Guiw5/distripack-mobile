import React, { PureComponent } from 'react'
import { Overlay, Text, Input, Button } from 'react-native-elements'
import { View, StyleSheet } from 'react-native'
import { myColors } from '../lib/commons'

export default class SetAccountModal extends PureComponent {
  constructor(props) {
    super(props)
    this.amount = ''
  }

  render() {
    return (
      <Overlay
        isVisible={this.props.visible}
        onBackdropPress={this.props.onCancel}
        animationType="fade"
        height={230}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Input
            autoFocus
            keyboardType="number-pad"
            label={'Saldo Anterior:'}
            placeholder={'Ingrese el monto'}
            onChangeText={text => (this.amount = text)}
            leftIcon={{ name: 'attach-money', color: myColors.green }}
          />
          <View style={styles.buttonsbar}>
            <Button
              title="CANCELAR"
              type="clear"
              onPress={this.props.onCancel}
            />
            <Button
              title="AGREGAR"
              type="clear"
              onPress={() => this.props.onOk(this.amount)}
            />
          </View>
        </View>
      </Overlay>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: myColors.grey2,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: myColors.grey2
  },
  buttonsbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: -1
  }
})
