import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import './config';
import AuthRoute from './component/auth-route/auth-route';
import Login from "./container/login/login";
import Register from "./container/register/register";
import GeniusInfo from './container/geniusinfo/geniusinfo';
import BossInfo from './container/bossinfo/bossinfo';

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {/*<AuthRoute></AuthRoute>*/}
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/geniusinfo" component={GeniusInfo}></Route>
                <Route path="/bossinfo" component={BossInfo}></Route>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));


registerServiceWorker();
