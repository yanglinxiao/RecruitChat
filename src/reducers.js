import {combineReducers} from 'redux';
import {user} from './redux/user.redux';

const reducers = combineReducers({user});

export default reducers;