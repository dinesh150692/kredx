/* Library Imports */
import { combineReducers } from 'redux';

/* Custom Reducer Imports */
import formReducer from './formReducer';

export default combineReducers({
    details: formReducer
});