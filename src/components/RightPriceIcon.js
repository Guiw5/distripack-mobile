import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import { myColors } from '../lib/commons'

export class RightPriceIcon extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.priceText}>{`$${this.props.price}`}</Text>
        <Icon
          type="entypo"
          name="chevron-thin-right"
          size={20}
          iconStyle={{ color: myColors.primary }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    color: myColors.green,
    fontFamily: 'sans-serif-light',
    marginRight: 10
  }
})
