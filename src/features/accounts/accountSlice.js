const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

export default function accoutReducer(
  state = initialStateAccount,
  { type, payload }
) {
  switch (type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + payload, isLoading: false };
    case 'account/withdraw':
      if (state.loan > state.balance) return state;
      return { ...state, balance: state.balance - payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + payload.amount,
        loan: payload.amount,
        loanPurpose: payload.purpose,
      };
    case 'account/payLoan':
      if (state.balance < state.loan) return state;
      return {
        ...state,
        balance: state.balance - state.loan,
        loanPurpose: '',
        loan: 0,
      };
    case 'account/convertingCurrency':
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });

    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const data = await res.json();
    const convertedAmount = amount * data.rates.USD;
    dispatch({ type: 'account/deposit', payload: convertedAmount });
  };
}

export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}

export function payLoan() {
  return { type: 'account/payLoan' };
}
