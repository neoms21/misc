import { find } from 'lodash/collection';
import {
  ADD_ACCOUNT,
  CLEAR_ACCOUNT_TO_EDIT,
  CLEAR_STATE,
  CLEAR_TEMPORARY_NOTES,
  EDIT_ACCOUNT,
  REMOVE_ACTION,
  SET_ACCOUNT_TO_EDIT,
  SET_ACTION_STATUS,
  SET_ACTIVE_ACCOUNT,
  SET_ACTIVE_CATEGORY,
  SET_TEMPORARY_NOTES,
  TOGGLE_ACTION_NONE_STATUS,
  TOGGLE_COMPLETE_ACTION,
} from '../constants/action-types';
import { ACTION_STATUS } from '../constants/constants';


function replaceItem(arr, itemToUpdate, index) {
  return [...arr.slice(0, index), itemToUpdate, ...arr.slice(index + 1)];
}

function getDisplayValue(input, productType) {
  return `${productType} *${input.substring(input.length - 3)}`;
}

const initialState = {
  accounts: [],
  selectedIndex: 0,
};


export default function accounts(state = initialState, action = '') {
  switch (action.type) {

    case ADD_ACCOUNT: {
      const newAccounts = [...state.accounts, {
        accountNumber: action.payload.accountId,
        displayAccountNumber: getDisplayValue(action.payload.accountId, action.payload.productType),
        actions: [],
        productType: action.payload.productType,
      }];

      return Object.assign({}, state,
        {
          accounts: newAccounts,
          selectedIndex: newAccounts.length - 1,
        },
      );
    }

    case EDIT_ACCOUNT: {
      const accountToModify = find(state.accounts,
        a => a.accountNumber === action.payload.originalNumber);
      const accIndex = state.accounts.indexOf(accountToModify);
      const updatedAccount = {
        ...accountToModify,
        accountNumber: action.payload.editedNumber,
        displayAccountNumber: getDisplayValue(action.payload.editedNumber,
          accountToModify.productType),
      };
      return {
        ...state,
        accounts: replaceItem(state.accounts, updatedAccount, accIndex),
        accountToEdit: undefined,
      };
    }

    case SET_ACTIVE_ACCOUNT: {
      const selectedAccount = find(state.accounts, a => a.accountNumber === action.payload);

      return { ...state, selectedIndex: state.accounts.indexOf(selectedAccount) };
    }

    case SET_ACTIVE_CATEGORY: {
      const accountToUpdate = state.accounts[state.selectedIndex];
      const updatedAccount = { ...accountToUpdate, selectedCategory: action.payload };

      return {
        ...state,
        accounts: replaceItem(state.accounts, updatedAccount, state.selectedIndex),
      };
    }

    case TOGGLE_ACTION_NONE_STATUS: {
      const acc = state.accounts[state.selectedIndex];
      const accIndex = state.accounts.indexOf(acc);
      const updatedAccount = {
        ...acc,
      };

      const actionExists = find(acc.actions, a => a.name === action.payload.action.name);
      if (actionExists) {
        updatedAccount.actions = acc.actions.filter(a => a.name !== action.payload.action.name);
      } else {
        updatedAccount.actions.push({
          ...action.payload.action,
          status: ACTION_STATUS.TODO,
          category: action.payload.category,
        });
      }

      return {
        ...state,
        accounts: replaceItem(state.accounts, updatedAccount, accIndex),
      };
    }

    case SET_ACTION_STATUS: {
      const acc = find(state.accounts, a => a.accountNumber === action.payload.accId);
      const accIndex = state.accounts.indexOf(acc);
      const updatedAccount = {
        ...acc,
      };

      if (action.payload.status === 'Default') {
        updatedAccount.actions =
          [...acc.actions.filter(ac => ac.name !== action.payload.action.name)];
      } else {
        const existingAction = find(acc.actions, a => a.name === action.payload.action.name);

        const indexOfAction = acc.actions.indexOf(existingAction);
        const newAction = { ...action.payload.action, status: action.payload.status };
        updatedAccount.actions = indexOfAction === -1 ? [...acc.actions, newAction]
          : replaceItem(acc.actions, newAction, indexOfAction);
      }

      return {
        ...state,
        accounts: replaceItem(state.accounts, updatedAccount, accIndex),
      };
    }

    case SET_ACCOUNT_TO_EDIT:
      return { ...state, accountToEdit: action.payload };

    case CLEAR_ACCOUNT_TO_EDIT:
      return { ...state, accountToEdit: undefined };

    case CLEAR_TEMPORARY_NOTES:
      return { ...state, tempNotes: '' };

    case SET_TEMPORARY_NOTES:
      return { ...state, tempNotes: action.payload };

    case CLEAR_STATE:
      return initialState;

    case TOGGLE_COMPLETE_ACTION: {
      const acc = find(state.accounts, a => a.accountNumber === action.payload.accountNumber);
      const accIndex = state.accounts.indexOf(acc);
      const existingAction = find(acc.actions, a => a.name === action.payload.action.name);

      const indexOfAction = acc.actions.indexOf(existingAction);
      const newAction = {
        ...action.payload.action,
        status: existingAction.status === ACTION_STATUS.DONE ?
          ACTION_STATUS.TODO : ACTION_STATUS.DONE,
      };

      const updatedAccount = {
        ...acc,
        actions: replaceItem(acc.actions, newAction, indexOfAction),
      };

      return {
        ...state,
        accounts: replaceItem(state.accounts, updatedAccount, accIndex),
      };
    }

    case REMOVE_ACTION: {
      const acc = state.accounts.find(a => a.accountNumber === action.payload.accountNumber);
      const accIndex = state.accounts.indexOf(acc);
      const updatedAccount = {
        ...acc,
      };

      updatedAccount.actions = acc.actions.filter(a => a.name !== action.payload.action.name);

      return {
        ...state,
        accounts: replaceItem(state.accounts, updatedAccount, accIndex),
      };
    }
    default:
      return state;
  }
}

