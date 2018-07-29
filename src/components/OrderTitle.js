import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { Separator, Capitalize } from './commons'

export default class OrderTitle extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>{Capitalize(this.props.title)}</Text>
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
