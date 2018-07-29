import React from 'react'
import { View, StyleSheet } from 'react-native'

export const Capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

export const Separator = () => <View style={style.separator} />

const style = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#CED0CE'
  }
})
