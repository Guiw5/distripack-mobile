import React, { PureComponent } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import { Text, Icon, ListItem, Card } from 'react-native-elements'

class DetailsTab extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.screenProps.client == null) {
      let id = this.props.screenProps.rootNavigation.getParam('clientId')
      this.props.screenProps.getClient(id)
    }
  }

  render() {
    if (this.props.screenProps.client == null) {
      return null
    }
    let client = this.props.screenProps.client
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          paddingBottom: 10
        }}
      >
        <Card
          containerStyle={{
            borderRadius: 10,
            backgroundColor: '#42adb320',
            width: 250
          }}
        >
          <ListItem
            title={'Nombre Completo'}
            subtitle={client.firstName + ' ' + client.lastName}
            titleStyle={{ fontSize: 14, textAlign: 'center' }}
            subtitleStyle={{ fontSize: 16, textAlign: 'center' }}
            contentContainerStyle={{
              marginBottom: 5
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0
            }}
          />
          <ListItem
            title={'Nombre Fantasía'}
            subtitle={client.fantasyName}
            titleStyle={{ fontSize: 14, textAlign: 'center' }}
            subtitleStyle={{ fontSize: 16, textAlign: 'center' }}
            contentContainerStyle={{
              marginBottom: 5
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0
            }}
          />
        </Card>

        <Card
          containerStyle={{
            borderRadius: 10,
            backgroundColor: '#42adb320',
            width: 250
          }}
        >
          <ListItem
            title={'Razón Social'}
            subtitle={client.businessName}
            titleStyle={{ fontSize: 14, textAlign: 'center' }}
            subtitleStyle={{ fontSize: 16, textAlign: 'center' }}
            contentContainerStyle={{
              paddingVertical: 5
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0
            }}
          />
          <ListItem
            title={'CUIT'}
            subtitle={client.cuit}
            titleStyle={{ fontSize: 14, textAlign: 'center' }}
            subtitleStyle={{ fontSize: 16, textAlign: 'center' }}
            contentContainerStyle={{
              marginBottom: 5
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0
            }}
          />
        </Card>
        <Card
          containerStyle={{
            borderRadius: 10,
            backgroundColor: '#42adb320',
            width: 250
          }}
        >
          <ListItem
            title={'Tel'}
            subtitle={client.phone}
            titleStyle={{ fontSize: 14, textAlign: 'center' }}
            subtitleStyle={{ fontSize: 16, textAlign: 'center' }}
            contentContainerStyle={{
              marginBottom: 5
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0
            }}
          />
          <ListItem
            title={'Celular'}
            subtitle={client.celPhone}
            titleStyle={{ fontSize: 14, textAlign: 'center' }}
            subtitleStyle={{ fontSize: 16, textAlign: 'center' }}
            contentContainerStyle={{
              marginBottom: 5
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0
            }}
          />
        </Card>
        <Card
          containerStyle={{
            borderRadius: 10,
            backgroundColor: '#42adb320',
            width: 250
          }}
        >
          <ListItem
            title={'Dirección'}
            subtitle={client.address}
            titleStyle={{ fontSize: 14, textAlign: 'center' }}
            subtitleStyle={{ fontSize: 16, textAlign: 'center' }}
            contentContainerStyle={{
              marginBottom: 5
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0
            }}
          />
        </Card>
        <Card
          containerStyle={{
            borderRadius: 10,
            backgroundColor: '#42adb320',
            width: 250
          }}
        >
          <ListItem
            title={'E-Mail'}
            subtitle={client.mail}
            titleStyle={{ fontSize: 14, textAlign: 'center' }}
            subtitleStyle={{ fontSize: 16, textAlign: 'center' }}
            contentContainerStyle={{
              marginBottom: 5
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0
            }}
          />
        </Card>
      </ScrollView>
    )
  }
}

class HistoryTab extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.screenProps.history == null)
      this.props.screenProps.getHistory(
        this.props.screenProps.rootNavigation.getParam('clientId')
      )
  }

  render() {
    return <View />
  }
}

export default createBottomTabNavigator(
  {
    Details: DetailsTab,
    History: HistoryTab
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

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
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
      activeTintColor: '#42adb3',
      inactiveTintColor: 'gray',
      activeBackgroundColor: '#42adb320',
      inactiveBackgroundColor: '#fff',
      showIcon: true,
      showLabel: false,
      indicatorStyle: { backgroundColor: '#42adb3' },
      style: {
        elevation: 4
      }
    }
  }
)
