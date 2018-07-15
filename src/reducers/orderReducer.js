import { tassign } from 'tassign';

const initialState = {  
  order: {
    items: [],
    clientId: 0
  }
}

const order = (state = initialState.order, action) => {
  switch (action.type) {
    case 'ADD_TO_ORDER':
      let newItem = { id: action.id, product: action.item, quantity: action.quantity };
      return tassign(state, { items: [...state.items, newItem] });
    case 'REMOVE_FROM_ORDER':
      return tassign(state, { items: state.items.filter(i => i.id !== action.item.id) });
    case 'UPDATE_ORDER':
      return tassign(state);
    case 'SET_CLIENT':
      return tassign(state, {clientId: action.clientId});
    case 'FETCH_ORDER':
      return state;
    default:
      return state;
  }
};
export default order;

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