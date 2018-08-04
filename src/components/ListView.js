import React from 'react'
import { View, FlatList } from 'react-native'
import { Separator } from './commons'

export default class ListView extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1, ...this.props.containerStyle }}>
        <FlatList
          extraData={this.props.extraData}
          renderItem={this.props.renderItem}
          data={this.props.data}
          keyExtractor={this.props.keyExtractor}
          ListFooterComponent={this.props.ListFooterComponent}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={Separator}
        />
      </View>
    )
  }
}