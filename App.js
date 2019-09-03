import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './src/store/configureStore'
import { initApp } from './src/store/actions'
import { useScreens } from 'react-native-screens'
import { createAppContainer } from 'react-navigation'
import Drawer from './src/navigation/MainDrawer'
import Sentry from 'sentry-expo'

Sentry.enableInExpoDevelopment = true
Sentry.config(
  'https://a4ef8c9c874d4e45b0143b709735d2b7@sentry.io/1540156'
).install()

useScreens()
const Navigator = createAppContainer(Drawer)

const store = configureStore()
store.dispatch(initApp())

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}
