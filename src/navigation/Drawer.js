import React from 'react'
import { View } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import {
  createDrawerNavigator,
  createStackNavigator,
  DrawerItems
} from 'react-navigation'

import OrderFlow from './OrderFlow'

import LastOrdersFlow from './LastOrdersFlow'

export default createDrawerNavigator(
  {
    NewOrder: {
      screen: OrderFlow,
      navigationOptions: {
        title: 'Nuevo Pedido',
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
    LastOrders: {
      screen: LastOrdersFlow,
      navigationOptions: {
        title: 'Ultimos Pedidos',
        drawerLabel: 'Ultimos Pedidos',
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="format-list-checks"
            size={20}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    contentComponent: props => (
      <View>
        <Text>CustomHeader</Text>
        <DrawerItems {...props} />
        <Text>CustomerFOOTER</Text>
      </View>
    ),
    contentOptions: {
      //items:['Home'],

      itemsContainerStyle: {},
      iconContainerStyle: {
        opacity: 1
      }
    },
    initialRouteName: 'LastOrders'
  }
)

// export default createStackNavigator(
//   {
//     Drawer: { screen: DrawerMenu }
//   },
//   {
//     headerMode: 'float',
//     initialRouteName: 'Drawer',
//     navigationOptions: ({ navigation }) => ({
//       headerLeft: (
//         <Icon
//           type="material-community"
//           name="menu"
//           containerStyle={{
//             paddingHorizontal: 15
//           }}
//           onPress={() => {
//             navigation.toggleDrawer()
//           }}
//         />
//       )
//     })
//   }
// )
