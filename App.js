import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { configureStore } from './src/store/configureStore'
import { initApp } from './src/store/actions'
import { useScreens } from 'react-native-screens'
import Drawer from './src/navigation/MainDrawer'
import Sentry from 'sentry-expo'

Sentry.enableInExpoDevelopment = true
Sentry.config(
  'https://a4ef8c9c874d4e45b0143b709735d2b7@sentry.io/1540156'
).install()

useScreens()

const store = configureStore()
store.dispatch(initApp())

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.Container}>
          <Drawer />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
