import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { View } from 'react-native'
import ToPrintScreen from './screens/ToPrintScreen'

import MenuButton from './MenuButton'
import OrderScreen from './screens/OrderScreen'
import { Icon, Badge } from 'react-native-elements'

const PrinterNotifications = () => {
  return (
    <View>
      <Icon
        name="print"
        color="#d73a49"
        containerStyle={{ paddingHorizontal: 15 }}
      />
      <Badge
        containerStyle={{
          // padding: 0,
          // paddingTop: 0,
          // paddingBottom: 0,
          // paddingLeft: 0,
          // paddingRight: 0,
          // marginHorizontal: 0,
          // marginLeft: 20,
          // width: 20,
          backgroundColor: 'grey'
        }}
        textStyle={{ fontSize: 10 }}
        wrapperStyle={{ paddingHorizontal: 0, marginHorizontal: 0 }}
        value="3"
      />
    </View>
  )
}

export default createStackNavigator(
  {
    ToPrint: {
      screen: ToPrintScreen,
      navigationOptions: props => ({
        title: 'Para Imprimir',
        headerLeft: <MenuButton {...props} />,
        headerRight: <PrinterNotifications {...props} />
      })
    },
    Order: {
      screen: OrderScreen,
      navigationOptions: {
        title: 'Orden de Compra'
      }
    }
  },
  {
    headerMode: 'float'
  }
)
