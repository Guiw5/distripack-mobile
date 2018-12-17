import React from 'react'
import { View, FlatList, ScrollView } from 'react-native'
import { Separator } from '../lib/commons'

export class ListView extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let { containerStyle, ...props } = this.props
    return (
      <View style={{ flex: 1, ...containerStyle }}>
        <FlatList keyboardShouldPersistTaps="handled" {...props} />
      </View>
    )
  }
}
