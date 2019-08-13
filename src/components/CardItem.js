import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from 'react-native-elements'
import { myColors } from '../lib/commons'

export default class CardItem extends PureComponent {
  render() {
    let { name, value, icon, onPress } = this.props
    return (
      <View
        style={
          !icon ? { ...styles.container, marginVertical: 5 } : styles.container
        }
      >
        <View>
          <Text style={styles.textContent}>{name}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <Text style={styles.textContent} onPress={onPress}>
            {!value ? 'NS/NC' : value}
          </Text>
          {icon ? (
            <Icon
              containerStyle={{
                marginRight: -12,
                marginVertical: -2
              }}
              color={myColors.primary}
              {...icon}
              raised
              reverse
              onPress={onPress}
              size={10}
            />
          ) : null}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textContent: {
    fontFamily: 'sans-serif-light',
    fontSize: 15
  }
})
