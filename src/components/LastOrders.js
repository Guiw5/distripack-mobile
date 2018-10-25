import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, CheckBox } from 'react-native-elements'

import Select from './Select'
import { colors } from 'react-native-elements/src/config'

export default class LastOrders extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      all: false
    }
  }

  componentDidMount() {
    if (this.props.clientsLoaded.length === 0) this.props.loadClients()
    if (this.props.orders.length === 0) this.props.loadOrders()
  }

  filter = text => item =>
    item.mail.toLowerCase().includes(text.toLowerCase()) ||
    item.nick.toLowerCase().includes(text.toLowerCase())

  onPress = client => () => {
    let order = this.props.orders.find(o => o.clientId === client.id)
    this.props.setOrder(order)
    this.props.navigation.navigate('Order')
  }

  onCheck = item => () => {
    this.setState(prevState => {
      let newState = { ...prevState.items }
      newState[item.id] = !prevState.items[item.id]
      return { ...prevState, items: newState }
    })
    console.log('state onCheck', this.state)
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.nick}
      subtitle={item.mail}
      subtitleStyle={{ fontSize: 12 }}
      onPress={this.onPress(item)}
      containerStyle={{ borderBottomWidth: 0, paddingVertical: 10 }}
      leftElement={
        <CheckBox
          checked={this.state.items[item.id] || this.state.all}
          onPress={this.onCheck(item)}
          iconType="ionicon"
          uncheckedIcon="ios-square-outline"
          checkedIcon="ios-checkbox-outline"
          checkedColor="#42adb3"
          textStyle={styles.checkText}
          containerStyle={styles.checkContainer}
        />
      }
    />
  )

  printOrders = () => {
    console.log('printed alls')
    //popup?
    //this.props.printOrders() -> backend print()
  }

  onCheckAll = () => {
    this.setState(prevState => ({
      ...prevState,
      all: !prevState.all
    }))
  }

  headerComponent = () => (
    <ListItem
      title="SELECCIONAR TODOS"
      containerStyle={{
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: colors.primary
      }}
      leftElement={
        <CheckBox
          checked={this.state.all}
          onPress={this.onCheckAll}
          iconType="ionicon"
          uncheckedIcon="ios-square-outline"
          checkedIcon="ios-checkbox-outline"
          checkedColor="#42adb3"
          textStyle={styles.checkText}
          containerStyle={styles.checkContainer}
        />
      }
    />
  )

  render() {
    console.log('one two three?')
    if (!this.props.clients) return null
    return (
      <Select
        autoFocus={false}
        keyExtractor={item => item.mail}
        placeholder="Escriba alias o mail del cliente"
        filter={this.filter}
        data={this.props.clients}
        extraData={this.state.items}
        renderItem={this.renderItem}
        headerComponent={this.headerComponent}
        button={{
          disabled:
            !Object.values(this.state.items).some(selected => selected) &&
            !this.state.all,
          title: 'Imprimir',
          onPress: this.printOrders
        }}
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
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    backgroundColor: 'transparent'
  }
})
