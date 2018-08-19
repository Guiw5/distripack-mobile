import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import actions from '../store/actions'
import selectors from '../store/selectors'
import ListView from './ListView'
import OrderItem from './OrderItem'
import ButtonFooter from './ButtonFooter'
import OrderFooter from './OrderFooter'
import OrderTitle from './OrderTitle'

class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = { deleteList: [] }
  }

  select = itemId => {
    this.setState((prevState, props) => {
      return { deleteList: prevState.deleteList.concat(itemId) }
    })
  }

  unselect = itemId => {
    this.setState(prevState => {
      return { deleteList: prevState.deleteList.filter(id => id !== itemId) }
    })
  }

  toDelete = itemId => !this.state.deleteList.includes(itemId)

  onCheckItem = itemId => {
    this.toDelete(itemId) ? this.select(itemId) : this.unselect(itemId)
  }

  goToDetails = item => {
    this.props.navigation.navigate('Details', { skuId: item.skuId })
  }

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

  subtotal = x => x.quantity * x.price

  getSubtotal = () =>
    this.props.order.items.reduce((acc, x) => acc + this.subtotal(x), 0)

  goToProducts = () => this.props.navigation.navigate('Products')

  removeItems = () => {
    this.props.removeItems(this.state.deleteList)
    this.setState({ deleteList: [] })
  }

  goToClients = () => this.props.navigation.navigate('Clients')

  createOrder = async () => {
    await this.props.createOrder(this.props.order)
    if (!this.props.error) this.goToClients()
  }

  render() {
    let toDelete = this.state.deleteList.length > 0
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <OrderTitle title={this.props.client.nick} />
        <ListView
          containerStyle={{ flex: 0.8, fontSize: 12 }}
          data={this.props.order.items}
          extraData={this.state.deleteList}
          keyExtractor={item => `${item.skuId}`}
          renderItem={this.renderItem}
          ListFooterComponent={
            <OrderFooter
              error={this.props.error}
              subtotal={this.getSubtotal()}
              onPress={this.goToProducts}
            />
          }
        />
        {toDelete ? (
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
    client: selectors.getClientFromOrder(state),
    order: selectors.getOrder(state),
    error: selectors.getOrderError(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeItems: items => {
      dispatch(actions.removeItems(items))
    },
    createOrder: order => {
      dispatch(actions.createOrder(order))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)
