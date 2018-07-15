import { tassign } from 'tassign';
import Products from '../data/test-products.json';

const products = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':     
      return Products;
    default:
      return state;
  }
};
export default products;