import React from 'react'
import { StyleSheet, Keyboard } from 'react-native'
import { ListItem } from 'react-native-elements'
import Select from './Select'
import { getOrder, getProducts } from '../actions/index'
import { connect } from 'react-redux'

class SelectProducts extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.products.length === 0) this.props.getProducts()

    if (this.props.order.items.length === 0) this.props.getOrder()
  }

  filter = text => item =>
    item.alias.toLowerCase().includes(text.toLowerCase()) ||
    item.descripcion.toLowerCase().includes(text.toLowerCase())

  createItem = product => {
    return { product, quantity: 1, price: product.precio }
  }

  getItem = id => this.props.order.items.find(item => item.product.id === id)

  goToDetails = product => {
    Keyboard.dismiss()

    let item = this.getItem(product.id)

    let isNew = !item
    if (isNew) item = this.createItem(product)

    this.props.navigation.navigate('Details', { item, isNew })
  }

  goToOrder = () => {
    this.props.navigation.navigate('Order')
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
          filter={this.filter}
          data={this.props.products}
          button={
            show
              ? {
                  title: 'Ver Pedido (' + order.items.length + ')',
                  onPress: this.goToOrder
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
