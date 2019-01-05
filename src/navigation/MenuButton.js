import React from 'react'
import { Icon } from 'react-native-elements'
import { Keyboard } from 'react-native'

const MenuButton = ({ navigation }) => (
  <Icon
    type="material-community"
    name="menu"
    containerStyle={{
      paddingHorizontal: 15
    }}
    onPress={() => {
      Keyboard.dismiss()
      navigation.toggleDrawer()
    }}
  />
)

export default MenuButton
