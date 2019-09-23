import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, CheckBox } from 'react-native-elements'
import { myColors } from '../lib/commons'

export default class OrderItem extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let { item } = this.props
    let { price, quantity, skuNick } = item
    let subtotal = price * quantity
    return (
      <ListItem
        title={skuNick}
        titleStyle={{ fontSize: 13 }}
        onPress={this.props.onlyRead ? null : this.props.onPress}
        contentContainerStyle={styles.listContent}
        containerStyle={[
          styles.listContainer,
          this.props.checked && { backgroundColor: myColors.dangerBg }
        ]}
        leftElement={
          (this.props.onlyRead && (
            <CheckBox
              checked={true}
              onPress={null}
              title={`${item.quantity}`}
              iconType="material"
              checkedIcon="chevron-right"
              textStyle={styles.checkText}
              checkedColor={myColors.primary}
              containerStyle={styles.checkContainer}
            />
          )) ||
          (!this.props.onlyRead && (
            <CheckBox
              title={`${item.quantity}`}
              checked={this.props.checked}
              onPress={this.props.onCheck}
              iconType="material"
              uncheckedIcon="close"
              checkedIcon="close"
              checkedColor={myColors.danger}
              textStyle={styles.checkText}
              containerStyle={styles.checkContainer}
            />
          ))
        }
        rightContentContainerStyle={{ flex: 0.4 }}
        rightSubtitle={`$${subtotal.toFixed(2)}`}
        rightSubtitleStyle={{ color: myColors.green }}
        bottomDivider
      />
    )
  }
}
const styles = StyleSheet.create({
  listContainer: {
    // borderBottomWidth: 1,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 0,
    marginBottom: 0,
    height: 50
  },
  checkText: {
    paddingLeft: 13,
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 0
  },
  checkContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: -13,
    marginRight: -10,
    // paddingLeft: 0,
    // paddingRight: 0,
    borderWidth: 0,
    width: 60,
    backgroundColor: 'transparent'
  },
  listContent: {
    paddingLeft: 0,
    marginLeft: 0
  }
})
