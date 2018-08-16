import React from 'react'
import { StyleSheet, View } from 'react-native'
import OrderFlow from './src/components/OrderFlow'
import { rootReducer } from './src/store/reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { loadProducts } from './src/store/products/actions'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.Container}>
          <OrderFlow />
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
