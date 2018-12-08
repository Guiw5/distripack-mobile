import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'

import OrderFlow from './OrderFlow'
import ToPrintFlow from './ToPrintFlow'
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
    ToPrint: {
      screen: ToPrintFlow,
      navigationOptions: {
        title: 'Para Imprimir',
        drawerLabel: 'Para Imprimir',
        drawerIcon: ({ tintColor }) => (
          <Icon name="print" size={20} color={tintColor} />
        )
      }
    },
    LastOrders: {
      screen: LastOrdersFlow,
      navigationOptions: {
        title: 'Ultimas Ventas',
        drawerLabel: 'Ultimas Ventas',
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
      <View style={{ paddingVertical: 40 }}>
        <DrawerItems {...props} />
      </View>
    ),
    contentOptions: {
      itemsContainerStyle: {},
      iconContainerStyle: {
        opacity: 1
      }
    },
    initialRouteName: 'ToPrint'
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
