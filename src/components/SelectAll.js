import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from 'react-native-elements/src/config'
import { ListItem, CheckBox } from 'react-native-elements'
import CheckItem from './CheckItem'

export default class SelectAll extends PureComponent {
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
      />
    )
  }
}
export const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: 0,
    marginVertical: 0,
    height: 45,
    borderWidth: 1,
    borderColor: colors.primary
  }
})
