import { combineReducers, createStore } from 'redux';
import accoutReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

const rootReducer = combineReducers({
  account: accoutReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
