import { configureStore } from '@reduxjs/toolkit';
import accoutReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

const store = configureStore({
  reducer: {
    account: accoutReducer,
    customer: customerReducer,
  },
});

export default store;
