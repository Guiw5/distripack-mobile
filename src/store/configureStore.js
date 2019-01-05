import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

// const middlewares = [thunk]
// options: https://github.com/jhen0409/react-native-debugger#options
const enhancer = composeWithDevTools(applyMiddleware(thunk))

export function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default)
    })
  }
  return store
}
