import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Button, Text, colors } from 'react-native-elements'
import { getOrder, setClient, removeItems } from '../actions'
import ListView from './ListView'
import OrderItem from './OrderItem'
import ButtonFooter from './ButtonFooter'

class Order extends React.Component {
  constructor(props) {
    super(props)
    this.props.order = this.props.navigation.state.params.order
    this.state = { deleteList: [] }
  }

  subtotal = x => x.quantity * x.price

  goToProducts = () => this.props.navigation.navigate('Products')

  footerComponent = () => {
    let subtotal = this.props.order.items
      .reduce((acc, x) => acc + this.subtotal(x), 0)
      .toFixed(2)
    return (
      <View>
        <View style={{ height: 1, backgroundColor: '#CED0CE' }} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            paddingVertical: 15,
            paddingRight: 10
          }}
        >
          <Text
            style={{ color: '#42adb3', paddingHorizontal: 15, marginRight: 0 }}
          >
            {'$' + subtotal}
          </Text>
          <Text>Subtotal </Text>
        </View>
        <Button
          title="Agregar más productos"
          onPress={this.goToProducts}
          titleStyle={styles.btnTitle}
          buttonStyle={styles.btnProducts}
          containerStyle={{ paddingTop: 10, alignItems: 'center' }}
        />
      </View>
    )
  }

  removeItems = () => {
    this.props.removeItems(this.state.deleteList)
  }

  createOrder = () => {}

  select = itemId => {
    this.setState((prevState, props) => {
      return { deleteList: prevState.deleteList.concat(itemId) }
    })
  }

  unselect = itemId => {
    this.setState((prevState, props) => {
      return { deleteList: prevState.deleteList.filter(id => id !== itemId) }
    })
  }

  toDelete = itemId => !this.state.deleteList.includes(itemId)

  onCheckItem = itemId => {
    this.toDelete(itemId) ? this.select(itemId) : this.unselect(itemId)
  }

  goToDetails = item => {
    this.props.navigation.navigate('Details', { item })
  }

  Capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

  listTitle = () => (
    <View>
      <Text style={styles.title}>
        {this.Capitalize(this.props.order.clientId)}
      </Text>
      <View style={{ height: 1, backgroundColor: '#CED0CE' }} />
    </View>
  )

  renderItem = ({ item }) => {
    let checked = !this.toDelete(item.id)
    return (
      <OrderItem
        item={item}
        checked={checked}
        onCheck={() => this.onCheckItem(item.id)}
        onPress={() => this.goToDetails(item)}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        {this.listTitle()}

        <ListView
          containerStyle={{ flex: 0.8 }}
          data={this.props.order.items}
          extraData={this.state.deleteList}
          keyExtractor={item => item.product.id}
          renderItem={this.renderItem}
          ListFooterComponent={this.footerComponent}
        />

        {this.state.deleteList.length > 0 ? (
          <ButtonFooter
            title="Eliminar Seleccionados"
            buttonStyle={{ backgroundColor: '#db3838' }}
            onPress={this.removeItems}
          />
        ) : (
          <ButtonFooter title="Confirmar Pedido" onPress={this.createOrder} />
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients,
    order: state.order,
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setClient: id => {
      dispatch(setClient(id))
    },
    getOrder: () => {
      dispatch(getOrder())
    },
    removeItems: items => {
      dispatch(removeItems(items))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10
  },
  btnProducts: {
    width: 300,
    height: 45,
    backgroundColor: '#FFF',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5
  },
  btnTitle: {
    color: colors.primary,
    fontFamily: 'sans-serif-light'
  }
})
