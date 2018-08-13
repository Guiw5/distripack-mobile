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

  componentDidMount() {
    this.props.getOrder()
  }

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

  createOrder = () => {
    this.props.createOrder(this.props.order)
    this.goToClients()
  }

  render() {
    let toDelete = this.state.deleteList.length > 0
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <OrderTitle title={this.props.order.client.nick} />
        <ListView
          containerStyle={{ flex: 0.8 }}
          data={this.props.order.items}
          extraData={this.state.deleteList}
          keyExtractor={item => item.sku.code}
          renderItem={this.renderItem}
          ListFooterComponent={
            <OrderFooter
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
    clients: selectors.getClients(state),
    order: selectors.getOrder(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setClient: client => {
      dispatch(actions.setClient(client))
    },
    getOrder: () => {
      dispatch(actions.getOrder())
    },
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
