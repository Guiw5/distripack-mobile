import { tassign } from 'tassign';
import Clients from '../data/test-clients.json';

const clients = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CLIENTS':          
      return Clients;
    default:
      return state;
  }
};
export default clients;