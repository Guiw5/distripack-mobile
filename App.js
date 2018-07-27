import React from 'react'
import { StyleSheet, View } from 'react-native'
import OrderFlow from './src/components/OrderFlow'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './src/reducers/index'

// import axios from 'axios';
// import axiosMiddleware from 'redux-axios-middleware';

// const client = axios.create({
//   baseURL: 'https://api.github.com',
//   responseType: 'json'
// });

const store = createStore(rootReducer)

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
