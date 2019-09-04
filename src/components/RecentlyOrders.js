import React, { PureComponent } from 'react'
import { SectionList, View, StyleSheet } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import { myColors, deliveryDayString } from '../lib/commons'
import moment from 'moment'
import ButtonFooter from './ButtonFooter'

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

  renderItem = ({ item }) => (
    <ListItem
      leftElement={<Text>{item.id}</Text>}
      contentContainerStyle={styles.listContent}
      containerStyle={styles.listContainer}
      titleStyle={{ margin: 0, padding: 0 }}
      title={`${moment(item.createdAt)
        .format('dddd DD/MM HH:mm')
        .toUpperCase()}hs`}
      subtitle={
        item.deliveredAt
          ? `Entregado el ${moment(item.deliveredAt).format('dddd DD/MM')}`
          : deliveryDayString(item.deliveryDate, new Date())
      }
      rightTitle={`$${this.getSubtotal(item)}`}
      rightTitleStyle={{ color: myColors.green }}
      rightContentContainerStyle={{ flex: 0.4 }}
      onPress={this.onPress(item)}
      bottomDivider
    />
  )

  renderSectionHeader = ({ section }) => (
    <ListItem
      title={(section.data.length === 0 ? 'No tiene ' : '') + section.title}
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
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SectionList
          sections={this.sections}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={item => item.id}
        />
        <ButtonFooter title="Nuevo" onPress={this.gotoProducts} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    color: myColors.primary,
    fontSize: 18
  },
  listContent: {
    marginLeft: 0,
    paddingLeft: 0
  },
  listContainer: {
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 0,
    marginBottom: 0,
    height: 60
  }
})
