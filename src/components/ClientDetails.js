import React, { PureComponent } from 'react'
import { View, ScrollView, StyleSheet, Linking } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import IconCard from './IconCard'
import { myColors } from '../lib/commons'

class DetailsTab extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let { client, getClient } = this.props.screenProps
    if (client == null) getClient()
  }

  handleWhatsapp = phone => async () => {
    var phoneString = phone.replace(/-/g, '')
    const url = `whatsapp://send?phone=54${phoneString}`
    return await Linking.openURL(url)
  }

  handleCall = phone => async () => {
    var phoneString = phone.replace(/-/g, '')
    const url = `tel:${phoneString}`

    return await Linking.openURL(url)
  }

  handleEmail = email => async () => {
    const url = `mailto:${email}`
    return await Linking.openURL(url)
  }

  render() {
    if (this.props.screenProps.client == null) {
      return null
    }
    let client = this.props.screenProps.client
    let fullName = client.firstName + ' ' + client.lastName
    return (
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <IconCard
          title="Comercio"
          fields={[
            { name: 'Nombre Fantasía', value: client.fantasyName },
            { name: 'Razón Social', value: client.businessName },
            { name: 'CUIT', value: client.cuit },
            { name: 'Dirección', value: client.address }
          ]}
          iconProps={{
            name: 'home',
            color: myColors.green
          }}
        />
        <IconCard
          title={'Contacto'}
          fields={[
            {
              name: 'Nombre Cliente',
              value: fullName,
              icon: { name: 'person' },
              onPress: this.handleCall(client.celPhone)
            },
            {
              name: 'Teléfono',
              value: client.phone,
              icon: { name: 'phone' },
              onPress: this.handleCall(client.phone)
            },
            {
              name: 'Celular',
              value: client.celPhone,
              icon: { name: 'phone-android' },
              onPress: this.handleWhatsapp(client.celPhone)
            },
            {
              name: 'E-Mail',
              value: client.email,
              icon: { name: 'email' },
              onPress: this.handleEmail(client.email)
            }
          ]}
          iconProps={{
            name: 'person',
            color: myColors.green
          }}
        />
      </ScrollView>
    )
  }
}

class TransactionsTab extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let {
      transactions,
      account,
      getAccount,
      getTransactions
    } = this.props.screenProps
    if (account == null) getAccount()
    if (transactions == null) getTransactions()
  }

  render() {
    console.log('loading', this.props.screenProps.loading)
    console.log('transactions', this.props.screenProps.transactions)
    console.log('account', this.props.screenProps.account)
    return <View />
  }
}

export default createBottomTabNavigator(
  {
    Details: DetailsTab,
    History: TransactionsTab
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        let type
        if (routeName === 'Details') {
          iconName = 'account-details'
          type = 'material-community'
        } else if (routeName === 'History') {
          iconName = 'history'
          type = 'material'
        }

        return (
          <Icon
            type={type}
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: myColors.green,
      inactiveTintColor: 'gray',
      activeBackgroundColor: myColors.greenBg,
      inactiveBackgroundColor: '#fff',
      showIcon: true,
      showLabel: false,
      indicatorStyle: { backgroundColor: myColors.green }
    }
  }
)

const styles = StyleSheet.create({
  scrollContainer: { backgroundColor: myColors.greenBg }
})
