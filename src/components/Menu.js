import React from 'react'
import { createDrawerNavigator } from 'react-navigation'

import OrderFlow from './OrderFlow'
import { Icon } from 'react-native-elements'

export default createDrawerNavigator(
  {
    NewOrder: {
      screen: OrderFlow,
      navigationOptions: {
        drawerLabel: 'Nuevo Pedido',
        drawerIcon: ({ tintColor }) => (
          <Icon type="material-community" name="cart" color={tintColor} />
        )
      }
    }
  },
  {}
  // },
  // NewClient: {
  //   name: 'Nuevo Cliente',
  //   screen: ClientScreen
  // }
)
