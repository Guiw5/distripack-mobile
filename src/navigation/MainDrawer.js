import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'

import OrderFlow from './OrderFlow'
import RecentsFlow from './RecentsFlow'
import PendingsFlow from './PendingsFlow'
import AccountsFlow from './AccountsFlow'
import { myColors } from '../lib/commons'

export default createDrawerNavigator(
  {
    NewOrder: {
      screen: OrderFlow,
      navigationOptions: {
        drawerLabel: 'Nuevo Pedido',
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="cart"
            size={20}
            color={tintColor}
          />
        )
      }
    },
    Recents: {
      screen: RecentsFlow,
      navigationOptions: {
        drawerLabel: 'Recientes',
        drawerIcon: ({ tintColor }) => (
          <Icon name="print" size={20} color={tintColor} />
        )
      }
    },
    Pendings: {
      screen: PendingsFlow,
      navigationOptions: {
        drawerLabel: 'En Reparto',
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="truck-delivery"
            size={20}
            color={tintColor}
          />
        )
      }
    },
    // Delivered: {
    //   screen: PendingsFlow,
    //   navigationOptions: {
    //     title: 'Entregados',
    //     drawerLabel: 'Entregados',
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon
    //         type="material-community"
    //         name="format-list-checks"
    //         size={20}
    //         color={tintColor}
    //       />
    //     )
    //   }
    // },
    Accounts: {
      screen: AccountsFlow,
      navigationOptions: {
        drawerLabel: 'Cuentas Ctes',
        drawerIcon: ({ tintColor }) => (
          <Icon name="people" size={20} color={tintColor} />
        )
      }
    }
  },
  {
    contentComponent: props => (
      <View style={{ paddingTop: 20 }}>
        <DrawerItems {...props} />
      </View>
    ),
    contentOptions: {
      itemsContainerStyle: {
        marginTop: 10
      },
      iconContainerStyle: {
        opacity: 1
      }
    },
    initialRouteName: 'NewOrder'
  }
)
