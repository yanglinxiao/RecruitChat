import axios from 'axios';

const USER_LIST = Symbol('USER_LIST');

const initState = {
    userList: []
}

export function chat(state=initState,action) {
    switch (action.type){
        case USER_LIST:
            return{
                ...state,userList: action.data
            }
        default:
            return state
    }
}

export function userList(data) {
    return{
        type: USER_LIST,
        data
    }
}

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