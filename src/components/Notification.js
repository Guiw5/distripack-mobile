import React, { PureComponent } from 'react'
import { Button } from 'react-native-elements'

export default class Notification extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Button
        containerStyle={{
          flex: 0.1,
          alignItems: 'center',
          margin: 0
        }}
        buttonStyle={{
          alignContent: 'center',
          backgroundColor: '#ffffff',
          width: 300,
          height: 45,
          borderRadius: 15,
          borderWidth: 0
        }}
        title={this.props.msg}
        titleStyle={{ color: '#000', fontFamily: 'sans-serif-light' }}
        onPress={this.props.onPress}
      />
    )
  }
}
