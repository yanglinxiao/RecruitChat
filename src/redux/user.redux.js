import axios from 'axios';
import {Toast} from 'antd-mobile';
import {getRedirectPath} from '../util';

const AUTH_SUCCESS = Symbol('AUTH_SUCCESS');
const ERROR_MESSAGE = Symbol('ERROR_MESSAGE');
const LOGOUT = Symbol('LOGOUT');
const LOAD_DATA = Symbol('LOAD_DATA');

const initState = {
    redirectTo:'',
    errMsg:'',
    userName: '',
    type: ''
};

// 注册对应的reducer处理函数
export function user(state = initState, action) {
    switch (action.type){
        case LOAD_DATA:
            return {
                ...state,
                errMsg: '',
                ...action.data
            }
        case AUTH_SUCCESS:
            return{
                ...state,
                redirectTo: getRedirectPath(action.data),
                errMsg: '',
                ...action.data
            };
        case ERROR_MESSAGE:
            return{
                ...state,
                errMsg: action.errMsg
            };
        case LOGOUT:
            return{
                ...initState,redirectTo:'/login'
            }
        default:
            return state;
    }
}


//缓存加载数据对应的action
export function loadData(data) {
    return{
        type: LOAD_DATA,
        data
    }
}

//登录注册完善信息对应的action
export function authSuccess(data) {
    return{
        type: AUTH_SUCCESS,
        data
    }
}


//登录或注册失败对应的action
export function errorMessage(errMsg) {
    return{
        type: ERROR_MESSAGE,
        errMsg
    }
}

/**
 退出登录对应的action
 */
export function logout() {
    return{
        type: LOGOUT
    }
}


//验证注册的信息
export function validateRegister({userName,password,confirmPwd,type}){
    let errMsg = '';
    if(!userName || !password || !type){
        errMsg = '用户名和密码是必填项';
        Toast.fail(errMsg);
        return errorMessage(errMsg);
    }
    if(password !== confirmPwd){
        errMsg = '两次输入的密码不一致';
        Toast.fail(errMsg);
        return errorMessage(errMsg);
    }
    return dispatch => {
        axios.post('/user/register',{userName,password,type})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    Toast.success('注册成功')
                    dispatch(authSuccess(res.data.result));
                }else{
                    Toast.fail(res.data.errMsg);
                    dispatch(errorMessage(res.data.errMsg));
                }
            })
    }
}

//验证登录的信息
export function validateLogin({userName, password}) {
    let errMsg = '';
    if(!userName || !password){
        errMsg = '用户名和密码是必填项';
        Toast.fail(errMsg);
        return errorMessage(errMsg);
    }
    return dispatch => {
        axios.get('/user/login',{params:{userName, password}})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    Toast.success('登录成功');
                    dispatch(authSuccess(res.data.result));
                }else{
                    Toast.fail(res.data.errMsg);
                    dispatch(errorMessage(res.data.errMsg));
                }
            })
    }
}

//更新个人信息
export function update(data) {
    return dispatch => {
        axios.post('/user/update',data)
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(authSuccess(res.data.result));
                }else{
                    dispatch(errorMessage(res.data.errMsg));
                }
            })
    }
}

