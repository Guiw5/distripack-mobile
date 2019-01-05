import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

export default class ButtonFooter extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Button
        {...this.props}
        containerStyle={[styles.container, this.props.containerStyle]}
        buttonStyle={[styles.button, this.props.buttonStyle]}
        titleStyle={[styles.title, this.props.titleStyle]}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 20
  },
  button: {
    height: 45,
    width: 300,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
  },
  title: {
    fontFamily: 'sans-serif-light'
  }
})
