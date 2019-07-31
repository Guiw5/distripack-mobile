import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, CheckBox } from 'react-native-elements'
import { myColors } from '../lib/commons'

export default class CheckItem extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ListItem
        rightTitle={this.props.rightTitle ? this.props.rightTitle : ''}
        rightSubtitle={this.props.rightSubtitle ? this.props.rightSubtitle : ''}
        title={this.props.title}
        subtitle={this.props.subtitle}
        subtitleStyle={{ fontSize: 12 }}
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
        bottomDivider={this.props.bottomDivider}
        containerStyle={[
          this.props.checked && {
            backgroundColor: this.props.isDeletion
              ? myColors.dangerBg
              : myColors.greenBg
          },
          this.props.containerStyle
        ]}
        leftElement={
          this.props.isDeletion ? (
            <CheckBox
              checked={this.props.checked}
              onPress={this.props.onCheck}
              iconType="material"
              uncheckedIcon={'close'}
              checkedIcon={'close'}
              checkedColor={myColors.danger}
              textStyle={styles.checkText}
              containerStyle={styles.checkContainer}
            />
          ) : (
            <CheckBox
              checked={this.props.checked}
              onPress={this.props.onCheck}
              iconType="material"
              uncheckedIcon={'check'}
              checkedIcon={'check'}
              checkedColor={myColors.green}
              textStyle={styles.checkText}
              containerStyle={styles.checkContainer}
            />
          )
        }
      />
    )
  }
}
const styles = StyleSheet.create({
  checkText: {
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 0,
    paddingRight: 0
  },
  checkContainer: {
    marginLeft: -13,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    backgroundColor: 'transparent'
  }
})
