import axios from 'axios';

const USER_LIST = Symbol('USER_LIST');

const initState = {
    userList: []
}

//处理用户列表的reducer
export function chatUser(state=initState,action) {
    switch (action.type){
        case USER_LIST:
            return{
                ...state,userList: action.data
            }
        default:
            return state
    }
}

//获取用户列表的action
export function userList(data) {
    return{
        type: USER_LIST,
        data
    }
}

//异步派发获取用户列表的action
export function getUserList(type) {
    return dispatch => {
        axios.get('user/list',{params:{type}})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(userList(res.data.result));
                }
            })
    }
}