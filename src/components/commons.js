import React from 'react'
import { View, StyleSheet } from 'react-native'

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase()
}

String.prototype.toProperCase = function() {
  return this.replace(/\w\S*/g, text => text.capitalize())
}

export const Separator = () => <View style={style.separator} />

const style = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#CED0CE'
  }
})
