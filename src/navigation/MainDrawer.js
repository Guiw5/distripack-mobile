import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'

import OrderFlow from './OrderFlow'
import RecentsFlow from './RecentsFlow'
import PendingsFlow from './PendingsFlow'
import ClientsFlow from './ClientsFlow'

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
    Recents: {
      screen: RecentsFlow,
      navigationOptions: {
        title: 'Recientes',
        drawerLabel: 'Recientes',
        drawerIcon: ({ tintColor }) => (
          <Icon name="print" size={20} color={tintColor} />
        )
      }
    },
    Pendings: {
      screen: PendingsFlow,
      navigationOptions: {
        title: 'En Reparto',
        drawerLabel: 'En Reparto',
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="format-list-checks"
            size={20}
            color={tintColor}
          />
        )
      }
    },
    Customers: {
      screen: ClientsFlow,
      navigationOptions: {
        title: 'Clientes',
        drawerLabel: 'Clientes',
        drawerIcon: ({ tintColor }) => (
          <Icon name="people" size={20} color={tintColor} />
        )
      }
    }
    // Delivered: {
    //   screen: PendingsFlow,
    //   navigationOptions: {
    //     title: 'Ultimas Entregas',
    //     drawerLabel: 'Ultimas Entregas',
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon
    //         type="material-community"
    //         name="format-list-checks"
    //         size={20}
    //         color={tintColor}
    //       />
    //     )
    //   }
    //}
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
    initialRouteName: 'Recents'
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
