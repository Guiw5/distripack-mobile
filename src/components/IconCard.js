import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import CardItem from './CardItem'

export default class IconCard extends PureComponent {
  render() {
    return (
      <Card containerStyle={styles.cardStyle} title={this.props.title}>
        <View>
          {this.props.fields.map((f, i) => (
            <CardItem
              key={i}
              name={f.name}
              value={f.value}
              icon={f.icon}
              onPress={f.onPress}
            />
          ))}
        </View>
        <Icon
          raised
          reverse
          containerStyle={styles.iconContainer}
          size={46}
          {...this.props.iconProps}
        />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: -58,
    left: 0
  },
  cardStyle: {
    flex: 1,
    elevation: 9,
    borderRadius: 8,
    marginTop: 40,
    width: '94%',
    alignSelf: 'center'
  }
})
