import React from 'react'
import { View, StyleSheet } from 'react-native'

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase()
}

String.prototype.toProperCase = function() {
  return this.replace(/\w\S*/g, text => text.capitalize())
}

String.prototype.contains = function(str) {
  return this.indexOf(str) != -1
}

Array.prototype.toDictionary = function(keyGenerator = el => el.id) {
  this.reduce((dict, el) => {
    dict[keyGenerator(el)] = el
    return dict
  }, {})
}

export const Separator = () => <View style={style.separator} />

const style = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#CED0CE'
  }
})
