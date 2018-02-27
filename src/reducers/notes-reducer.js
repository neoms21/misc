import { find } from 'lodash/collection';
import { ADD_ACCOUNT, EDIT_ACCOUNT, SET_NOTES } from '../constants/action-types';

function getActionNotes(action, existingNotes) {
  let newNotes = '';
  const act = action.payload.action;
  if (act.status === 'ToDo') {
    newNotes = `${existingNotes}\n** ACTION REMOVED: ${act.name} **`;
  } else {
    newNotes = `${existingNotes}\nACTION:${act.name} ${act.summary}`;
  }
  return newNotes;
}

export default function actions(state = { notes: [] }, action = '') {
  const payload = action.payload;

  switch (action.type) {
    case ADD_ACCOUNT: {
      const accountNumber = payload.accountId;

      return {
        ...state,
        notes: [...state.notes, {
          accountNumber: payload.accountId,
          text: `${payload.productType}, ${accountNumber}`,
        }],
      };
    }

    case EDIT_ACCOUNT: {
      const existingNotes = find(state.notes, n => n.accountNumber
        === payload.originalNumber).text;
      const newNotes = existingNotes.replace(payload.originalNumber, payload.editedNumber);
      return {
        ...state,
        notes: [...state.notes.filter(n => n.accountNumber !== payload.originalNumber), {
          accountNumber: payload.editedNumber,
          text: newNotes,
        }],
      };
    }

    case SET_NOTES: {
      const existingNotes = state.notes.find(n => n.accountNumber === payload.accountNumber);
      const existingNotesText = existingNotes ? existingNotes.text : '';

      const newNotes = payload.action ?
        getActionNotes(action, existingNotesText) : payload.text;

      return {
        ...state,
        notes: [...state.notes.filter(n => n.accountNumber !== payload.accountNumber), {
          accountNumber: payload.accountNumber,
          text: `${newNotes}`,
        }],
      };
    }
    default:
      return state;
  }
}
