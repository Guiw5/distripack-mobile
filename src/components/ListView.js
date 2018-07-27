import React from 'react'
import { View, FlatList } from 'react-native'

export default class ListView extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  renderSeparator = () => (
    <View style={{ height: 1, backgroundColor: '#CED0CE' }} />
  )

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
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}
