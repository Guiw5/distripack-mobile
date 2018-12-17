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
      <View style={{ backgroundColor: '#fff' }}>
        <Text style={styles.title}>{this.props.title.capitalize()}</Text>
        <Separator />
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
  }
})
