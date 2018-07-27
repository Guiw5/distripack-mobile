import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, CheckBox } from 'react-native-elements'

export default class OrderItem extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let { item } = this.props
    let { price, quantity, product } = item
    let subtotal = price * quantity
    return (
      <ListItem
        title={product.alias}
        onPress={this.props.onPress}
        contentContainerStyle={styles.listContent}
        containerStyle={[
          styles.listContainer,
          this.props.checked && { backgroundColor: '#db383820' }
        ]}
        leftElement={
          <CheckBox
            title={'' + item.quantity}
            checked={this.props.checked}
            onPress={this.props.onCheck}
            iconType="ionicon"
            uncheckedIcon="ios-square-outline"
            checkedIcon="ios-checkbox-outline"
            checkedColor="#db3838"
            textStyle={styles.checkText}
            containerStyle={styles.checkContainer}
          />
        }
        rightSubtitle={'$' + subtotal.toFixed(2)}
        rightSubtitleStyle={{ color: '#42adb3' }}
      />
    )
  }
}
const styles = StyleSheet.create({
  listContainer: {
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 0,
    marginBottom: 0,
    alignItems: 'center'
  },
  checkText: {
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 0,
    paddingRight: 0
  },
  checkContainer: {
    marginLeft: 10,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  listContent: {
    paddingLeft: 0,
    marginLeft: 0,
    alignItems: 'center'
  }
})
