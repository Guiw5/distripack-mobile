import { tassign } from 'tassign'

const initialState = {
  items: [],
  client: {}
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_ORDER':
      let newItem = { id: action.id, ...action.item }
      return tassign(state, { items: state.items.concat(newItem) })
    case 'REMOVE_FROM_ORDER':
      return tassign(state, {
        items: state.items.filter(i => !action.items.includes(i.id))
      })
    case 'UPDATE_ORDER':
      let updatedItem = { ...action.item }
      return tassign(state, {
        items: state.items.map(
          item => (item.sku.code === updatedItem.sku.code ? updatedItem : item)
        )
      })
    case 'SET_CLIENT':
      return tassign(state, { client: action.client })
    case 'FETCH_ORDER':
      return state
    default:
      return state
  }
}
export default order

// const todos = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [
//         ...state,
//         {
//           id: action.id,
//           text: action.text,
//           completed: false
//         }
//       ]
//     case 'TOGGLE_TODO':
//       return state.map(todo =>
//         (todo.id === action.id)
//           ? {...todo, completed: !todo.completed}
//           : todo
//       )
//     default:
//       return state
//   }
