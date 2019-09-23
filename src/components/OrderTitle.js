import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { Separator } from '../lib/commons'

export default class OrderTitle extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline'
        }}
      >
        <Text style={styles.title}>{this.props.title.capitalize()}</Text>
        <Text style={styles.titleRight}>Nro: {this.props.nro} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10
  },
  titleRight: {
    fontFamily: 'sans-serif-light',
    fontSize: 16,
    paddingLeft: 5,
    paddingBottom: 5
  }
})
