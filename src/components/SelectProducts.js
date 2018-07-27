import React from 'react'
import { StyleSheet, Keyboard } from 'react-native'
import { ListItem } from 'react-native-elements'
import Select from './Select'
import { getOrder, getProducts } from '../actions/index'
import { connect } from 'react-redux'

class SelectProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    if (this.props.products.length === 0) this.props.getProducts()

    if (this.props.order.items.length === 0) this.props.getOrder()
  }

  filterProducts = text => {
    let results = this.props.products
    if (text) {
      results = results.filter(
        item =>
          item.alias.toLowerCase().includes(text.toLowerCase()) ||
          item.descripcion.toLowerCase().includes(text.toLowerCase())
      )
    }
    return results
  }

  goToDetails = product => {
    Keyboard.dismiss()
    let orderItem = { product, quantity: 1, price: product.precio }
    let included = this.props.order.items
      .map(item => item.product.id)
      .includes(product.id)
    this.props.navigation.navigate('Details', {
      item: orderItem,
      isNew: !included
    })
  }

  goToOrder = order => {
    this.props.navigation.navigate('Order', { order })
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.alias}
      subtitle={item.descripcion}
      subtitleStyle={{ fontSize: 12 }}
      rightSubtitle={'$' + item.precio.toFixed(2)}
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.goToDetails(item)}
    />
  )

  render() {
    let order = this.props.order
    let show = order && order.items.length > 0
    return (
      this.props.products.length > 0 && (
        <Select
          keyExtractor={item => item.id}
          placeholder="Escriba nombre o alias del producto"
          renderItem={this.renderItem}
          filter={this.filterProducts}
          button={
            show
              ? {
                  title: 'Ver Pedido (' + order.items.length + ')',
                  onPress: () => this.goToOrder(order)
                }
              : null
          }
        />
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    order: state.order
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrder: item => {
      dispatch(getOrder(item))
    },
    getProducts: () => {
      dispatch(getProducts())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectProducts)

styles = StyleSheet.create({})
