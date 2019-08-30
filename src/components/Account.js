import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation'
import { myColors } from '../lib/commons'
import { TransactionsTab } from './TransactionsTab'
import { DetailsTab } from './DetailsTab'

export default createBottomTabNavigator(
  {
    Transactions: TransactionsTab,
    Details: DetailsTab
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
        } else if (routeName === 'Transactions') {
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
