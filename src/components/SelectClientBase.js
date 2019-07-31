import React from 'react'
import { ListItem } from 'react-native-elements'

import Select from './Select'

export default class SelectClientBase extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  onPress = item => () => this.props.onPress(item)

  renderItem = ({ item }) => (
    <ListItem
      title={item.nick}
      subtitle={item.mail}
      bottomDivider
      subtitleStyle={{ fontSize: 12 }}
      containerStyle={{ paddingVertical: 15 }}
      onPress={this.onPress(item)}
    />
  )

  render() {
    return (
      <Select
        keyExtractor={this.props.keyExtractor}
        placeholder={
          this.props.placeholder || 'Escriba alias o mail del cliente'
        }
        filter={this.props.filter}
        data={this.props.data}
        renderItem={this.renderItem}
        button={this.props.button}
      />
    )
  }
}
