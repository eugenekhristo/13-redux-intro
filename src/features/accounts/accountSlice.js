const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

export default function accoutReducer(
  state = initialStateAccount,
  { type, payload }
) {
  switch (type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + payload };
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

    default:
      return state;
  }
}

export function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
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
