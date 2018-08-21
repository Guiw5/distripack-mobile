import React from 'react'
import { StyleSheet, View } from 'react-native'
import OrderFlow from './src/components/OrderFlow'
import Menu from './src/components/Menu'
import { rootReducer } from './src/store/reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.Container}>
          <Menu />
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
