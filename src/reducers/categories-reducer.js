import { ADD_ACTION_TO_CATEGORY, CLEAR_STATE, FETCH_CATEGORIES } from '../constants/action-types';

const initialState = {
  categories: {
    'Hold or Complaint': {
      actions: [
        {
          name: 'Hold',
          summary: 'Hold applied - specify time - e.g. three to 30 days - ',
          productTypes: [],
        },
        {
          name: 'Complaint',
          summary: 'Complaint reference - high level understanding of complaint - amount of redress',
          productTypes: [],
        },
      ],
    },
    Fees: {
      actions: [
        {
          name: 'Amend Promo Rate',
          summary: 'Reapply/extend promo rate - ',
          productTypes: ['Credit Card'],
        },
        {
          name: 'Refund Fee',
          summary: 'Refund actioned - £',
          productTypes: ['Credit Card', 'Current account', 'Loan'],
        },
        {
          name: 'T82',
          summary: 'N/a - see repayment plan',
          productTypes: ['Current account'],
        },
        {
          name: 'Control Service',
          summary: 'n/a - discontinued',
          productTypes: ['Current account'],
        },
        {
          name: 'Downgrade Account',
          summary: 'Downgrade account - specify type-  e.g from to Ultimate Reward to Reward account',
          productTypes: ['Current account'],
        },
        {
          name: 'Waive Fee',
          summary: 'Waive Fee - specify type - £',
          productTypes: ['Current account'],
        },
      ],
    },
    'Direct Debit': {
      actions: [
        {
          name: 'Set Direct Debit',
          summary: 'Amend, Amount, date - colleague can agree timeframet',
          productTypes: ['Credit Card', 'Loan'],
        },
        {
          name: 'Amend Direct Debit',
          summary: 'Amend amount, agree date',
          productTypes: ['Credit Card'],
        },
        {
          name: 'Cancel Direct Debit',
          summary: 'Process cancellation as per customer request',
          productTypes: ['Credit Card', 'Loan'],
        },
      ],
    },
    'Repayment Plans': {
      actions: [
        {
          name: 'Set Repayment Plan',
          summary: 'Amount, date, number of months, method of payment - apply T82',
          productTypes: ['Credit Card', 'Current account', 'Loan'],
        },
        {
          name: 'Amend Repayment Plan',
          summary: 'Amount, date/time, number of months, method of payment',
          productTypes: ['Credit Card', 'Current account', 'Loan'],
        },
      ],
    },
    'Custom Actions': { actions: [] },
  },
};

export default function actions(state = initialState, action = '') {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return state;
    case CLEAR_STATE:
      return state;
    case ADD_ACTION_TO_CATEGORY: {
      const newActions = [...state.categories['Custom Actions'].actions, {
        name: action.payload,
        summary: action.payload,
      }];

      const newCustom = { ...state.categories['Custom Actions'], actions: newActions };

      return { ...state, categories: { ...state.categories, 'Custom Actions': newCustom } };
    }
    default:
      return state;
  }
}
