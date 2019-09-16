import React, { PureComponent } from 'react'
import { SectionList, View, StyleSheet } from 'react-native'
import { ListItem, Text, Card } from 'react-native-elements'
import { myColors, deliveryDayString } from '../lib/commons'
import moment from 'moment'
import ButtonFooter from './ButtonFooter'
import { FlatList, RotationGestureHandler } from 'react-native-gesture-handler'
import { Subtotal } from './Order'
import OrderItem from './OrderItem'

export default class RecentlyOrders extends PureComponent {
  constructor(props) {
    super(props)
  }

  sections = [
    {
      title: 'Pedidos Recientes',
      data: this.props.created || []
    },
    {
      title: 'Pedidos En Reparto',
      data: this.props.pending || []
    },
    {
      title: 'Pedidos Entregados (30 días)',
      data: this.props.delivered || []
    }
  ]

  subtotal = item => item.price * item.quantity

  getSubtotal = order =>
    order.items.reduce((acc, x) => acc + this.subtotal(x), 0)

  onPress = item => () => {
    const { client, ...order } = item
    this.props.setOrder(order)
    this.props.navigation.navigate('Order')
  }

  renderOrderItem = ({ item }) => (
    <ListItem
      leftElement={
        <Text
          style={{
            marginLeft: -10,
            width: 35,
            backgroundColor: myColors.danger
          }}
        >
          {item.quantity}
        </Text>
      }
      title={item.skuNick}
      titleStyle={{ fontSize: 12 }}
      rightTitle={`$${item.price}`}
      rightTitleStyle={{ fontSize: 12, marginRight: -10 }}
      containerStyle={{
        paddingVertical: 5,
        backgroundColor: myColors.grey4
      }}
    />
  )

  renderItem = ({ item }) => (
    // <Card
    //   key={order.id}
    //   title={`Orden #${order.id}`}
    //   wrapperStyle={{
    //     backgroundColor: myColors.greenBg
    //   }}
    //   containerStyle={{
    //     borderRadius: 3
    //   }}
    // >
    //   <FlatList
    //     containerStyle={{ flex: 0.4 }}
    //     data={order.items}
    //     keyExtractor={({ index }) => `${index}`}
    //     renderItem={this.renderOrderItem}
    //     ListFooterComponent={<Subtotal subtotal={this.getSubtotal(order)} />}
    //   />
    // </Card>
    <ListItem
      contentContainerStyle={styles.listContent}
      containerStyle={styles.listContainer}
      titleStyle={{ margin: 0, padding: 0 }}
      title={`${moment(item.createdAt)
        .format('dddd DD/MM, HH:mm')
        .capitalize()}hs`}
      subtitle={
        item.deliveredAt
          ? `entregado el ${moment(item.deliveredAt).format('dddd DD/MM')}`
          : deliveryDayString(item.deliveryDate, new Date()).toLowerCase()
      }
      rightSubtitle={`Orden: #${item.id}`}
      rightTitle={`$${this.getSubtotal(item).toFixed(2)}`}
      rightTitleStyle={{ color: myColors.green }}
      rightContentContainerStyle={{ flex: 0.4 }}
      onPress={this.onPress(item)}
      bottomDivider
    />
  )

  renderSectionHeader = ({ section }) =>
    section.data.length !== 0 && (
      <ListItem
        title={section.title}
        containerStyle={{
          backgroundColor: myColors.primaryBg,
          paddingVertical: 5
        }}
        titleStyle={styles.sectionHeader}
        bottomDivider
      />
    )

  gotoProducts = () => {
    const { navigation, setClient } = this.props
    const id = navigation.getParam('clientId')
    const client = navigation.getParam('nick')
    setClient(id)
    navigation.navigate('Products', { client })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          sections={this.sections}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={item => item.id}
          initialNumToRender={13}
        />
        <ButtonFooter title="Nuevo" onPress={this.gotoProducts} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    color: myColors.primary,
    fontSize: 18,
    textAlign: 'center'
  },
  listContent: {
    //   marginLeft: 0,
    //   paddingLeft: 0
  },
  listContainer: {
    // marginLeft: 0,
    // paddingLeft: 0,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 0,
    marginBottom: 0,
    height: 60
  }
})
