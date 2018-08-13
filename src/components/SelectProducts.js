import React from 'react'
import { Keyboard } from 'react-native'
import { ListItem } from 'react-native-elements'
import Select from './Select'
import actions from '../store/actions'
import selectors from '../store/selectors'
import { connect } from 'react-redux'

class SelectProducts extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadProducts()
    this.props.getOrder()
  }

  filter = text => item => {
    if (text.length < 1) return true
    let name = item.name.toLowerCase()
    let nick = item.nick.replace('/', ' ').toLowerCase()
    let query = text.replace('/', ' ').toLowerCase()

    let isInProductName = text => name.contains(text) || nick.contains(text)

    let words = query.split(' ')
    return isInProductName(query) || words.every(isInProductName)
  }

  createItem = sku => {
    return { sku, quantity: 1, price: sku.price }
  }

  getFromOrder = code =>
    this.props.order.items.find(item => item.sku.code === code)

  goToDetails = product => {
    Keyboard.dismiss()

    if (product.skus.length > 1)
      this.props.navigation.navigate('Skus', { skus: product.skus })
    else {
      let item = this.getFromOrder(product.skus[0].code)

      let isNew = !item
      if (isNew) item = this.createItem(product.skus[0])

      this.props.navigation.navigate('Details', { item, isNew })
    }
  }

  goToOrder = () => {
    this.props.navigation.navigate('Order')
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.nick.toProperCase()}
      subtitle={item.name.toProperCase()}
      subtitleStyle={{ fontSize: 12 }}
      rightSubtitle={
        item.skus.length > 1 ? '+' : '$' + item.skus[0].price.toFixed(2)
      }
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.goToDetails(item)}
    />
  )

  render() {
    let order = this.props.order
    let show = order && order.items.length > 0
    return (
      <Select
        keyExtractor={item => `${item.id}`}
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
  }
}

const mapStateToProps = state => {
  return {
    products: selectors.getProducts(state),
    order: selectors.getOrder(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrder: () => {
      dispatch(actions.getOrder())
    },
    loadProducts: () => {
      dispatch(actions.loadProducts())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectProducts)
