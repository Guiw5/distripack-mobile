import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import CheckItem from './CheckItem'
import { myColors } from '../lib/commons'

export default class CheckAll extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CheckItem
        title={'Seleccionar todos'}
        containerStyle={styles.containerStyle}
        onPress={this.props.onPress}
        onCheck={this.props.onPress}
        checked={this.props.checked}
        checkedColor={myColors.primary}
      />
    )
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: 0,
    marginVertical: 0,
    height: 45,
    borderWidth: 1,
    borderColor: myColors.primary,
    backgroundColor: '#fff'
  }
})
