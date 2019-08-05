import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Button, Icon, Text } from 'react-native-elements'
import { myColors } from '../lib/commons'

const Pill = props => {
  return (
    <Button
      type="outline"
      raised
      buttonStyle={styles.button}
      icon={props.icon}
      onPress={props.onPillPress}
    />
  )
}

const PillPlus = props => {
  return (
    <Pill
      onPillPress={props.onPillPress}
      icon={<Icon name="add" size={20} color={myColors.primary} />}
    />
  )
}

const PillMinus = props => {
  return (
    <Pill
      onPillPress={props.onPillPress}
      icon={<Icon name="remove" size={20} color={myColors.primary} />}
    />
  )
}

const PillInput = props => {
  return (
    <TextInput
      underlineColorAndroid="transparent"
      style={styles.input}
      defaultValue={props.value}
      onEndEditing={props.onTextChanged}
      selectTextOnFocus
      keyboardType="numeric"
    />
  )
}

const Pills = props => {
  const {
    title,
    onMinusPress,
    onPlusPress,
    onTextChanged,
    value,
    containerStyle,
    contentContainerStyle
  } = props

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={StyleSheet.flatten([
          styles.contentContainerStyle,
          contentContainerStyle
        ])}
      >
        <PillMinus onPillPress={onMinusPress} />
        <PillInput onTextChanged={onTextChanged} value={value} />
        <PillPlus onPillPress={onPlusPress} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70
  },
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 70,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: myColors.primary
  },
  title: { fontWeight: 'bold' },
  input: {
    width: 70,
    textAlign: 'center',
    fontSize: 18
  }
})

export { Pills, Pill, PillMinus, PillPlus, PillInput }
