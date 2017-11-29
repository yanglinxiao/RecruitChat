import axios from 'axios';
import io from 'socket.io-client';

const MSG_LIST = Symbol('MSG_LIST');//获取消息列表
const MSG_REC = Symbol('MSG_RECIEVE');//接收消息
const MSG_READ = Symbol('MSG_READ');//标记消息读取情况
const socket = io('ws://localhost:1234');
const initState = {
    chatMsgList: [],
    unread: 0
}

export function chat(state=initState,action) {
    switch (action.type){
        case MSG_LIST:
            return{
                ...state,
                chatMsgList: action.msgList,
                unread: action.msgList.filter(msg => !msg.read && msg.to === action.allState.user._id).length,
                userList: action.userList
            }
        case MSG_REC:
            const num = action.msgRec.to === action.allState.user._id ? 1 : 0;
            return{
                ...state,
                chatMsgList: [...state.chatMsgList,action.msgRec],
                unread: state.unread + num
            }
        case MSG_READ:
            return{
                ...state
            }
        default:
            return state
    }
}

export function msgList(msgList,userList,allState) {
    return {
        type: MSG_LIST,
        msgList,
        userList,
        allState
    }
}

export function msgRec(msgRec,allState) {
    return{
        type: MSG_REC,
        msgRec,
        allState
    }
}

export function recMsg() {
    return (dispatch,getState) => {
        socket.on('recMsg',(msg) => {
            dispatch(msgRec(msg,getState()));
        })
    }
}

export function sendMsg({from,to,msg}) {
    return dispatch => {
        socket.emit('sendMsg',{from,to,msg});
    }
}

export function getMsgList() {
    return (dispatch,getState) => {
        axios.get('/user/getMsgList')
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(msgList(res.data.result,res.data.userList,getState()));
                }
            })
    }
}


