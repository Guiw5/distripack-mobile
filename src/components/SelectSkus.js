import React from 'react'
import { Keyboard, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { getOrder, getSkus } from '../actions/index'
import { connect } from 'react-redux'
import ListView from './ListView'

class SelectSkus extends React.PureComponent {
  constructor(props) {
    super(props)
    this.skus = this.props.navigation.state.params.skus
  }

  componentDidMount() {
    this.props.getOrder()
  }

  createItem = sku => {
    return { sku, quantity: 1, price: sku.price }
  }

  getFromOrder = code =>
    this.props.order.items.find(item => item.sku.code === code)

  goToDetails = sku => {
    Keyboard.dismiss()

    let item = this.getFromOrder(sku.code)

    let isNew = !item
    if (isNew) item = this.createItem(sku)

    this.props.navigation.navigate('Details', { item, isNew })
  }

  goToOrder = () => {
    this.props.navigation.navigate('Order')
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.nick.toProperCase()}
        subtitle={item.description.toProperCase()}
        subtitleStyle={{ fontSize: 12 }}
        rightSubtitle={'$' + item.price.toFixed(2)}
        containerStyle={{ borderBottomWidth: 0 }}
        onPress={() => this.goToDetails(item)}
      />
    )
  }

  render() {
    return (
      <ListView
        keyExtractor={item => item.code}
        renderItem={this.renderItem}
        data={this.skus}
      />
    )
  }
}

const mapStateToProps = ({ skus, order }) => {
  return { skus, order }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrder: () => {
      dispatch(getOrder())
    },
    getSkus: () => {
      dispatch(getSkus())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSkus)
