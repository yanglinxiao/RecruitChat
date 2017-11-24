import {combineReducers} from 'redux';
import {user} from './redux/user.redux';
import {chat} from './redux/chat.redux';

const reducers = combineReducers({user,chat});

export default reducers;