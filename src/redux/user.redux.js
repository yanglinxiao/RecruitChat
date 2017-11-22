import axios from 'axios';
import {Toast} from 'antd-mobile';
import {getRedirectPath} from '../util';

const REGISTER_SUCCESS = Symbol('REGISTER_SUCCESS');
const LOGIN_SUCCESS = Symbol('LOGIN_SUCCESS');
const ERROR_MESSAGE = Symbol('ERROR_MESSAGE');

const initState = {
    isAuth: '',
    rediectTo:'',
    errMsg:'',
    userName: '',
    password: '',
    type: ''
};

// 注册对应的reducer处理函数
export function user(state = initState, action) {
    switch (action.type){
        case REGISTER_SUCCESS:
            return{
                ...state,
                isAuth: true,
                rediectTo: getRedirectPath(action.data),
                errMsg: '',
                ...action.data
            };
        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuth: true,
                rediectTo: getRedirectPath(action.data),
                errorMessage: '',
                ...action.data
            }
        case ERROR_MESSAGE:
            return{
                ...state,
                isAuth: false,
                errMsg: action.errMsg
            };
        default:
            return state;
    }
}

//注册成功对应的action
export function registerSuccess(data) {
    return{
        type: REGISTER_SUCCESS,
        data
    }
}

//登录成功对应的action
export function loginSuccess(data) {
    return{
        type: LOGIN_SUCCESS,
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
                    dispatch(registerSuccess({userName,password,type}));
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
                console.log(res.data);
                if(res.status === 200 && res.data.code === 0){
                    Toast.success('登录成功');
                    dispatch(loginSuccess(res.data.data));
                }else{
                    Toast.fail(res.data.errMsg);
                    dispatch(errorMessage(res.data.errMsg));
                }
            })
    }
}

