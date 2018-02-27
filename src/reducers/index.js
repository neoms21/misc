import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import categories from './categories-reducer';
import accounts from './accounts-reducer';
import notes from './notes-reducer';
import login from './login-reducer';
import header from './header-reducer';


const rootReducer = combineReducers({
  form: reduxFormReducer,
  categories,
  accounts,
  notes,
  login,
  header,
});

export default rootReducer;
