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
                //获取与自身相关的未读消息数
                unread: action.msgList.filter(msg => !msg.read && msg.to === action.allState.user._id).length,
                userList: action.userList
            }
        case MSG_REC:
            //接受与自身相关的消息
            const num = action.msgRec.to === action.allState.user._id ? 1 : 0;
            return{
                ...state,
                //把接收到的消息对象加入收聊天内容的数组中
                chatMsgList: [...state.chatMsgList,action.msgRec],
                unread: state.unread + num
            }
        case MSG_READ:
            return{
                ...state,
                //根据聊天组中发出者的id和接收者的id来更新对应聊天组中消息已读数
                chatMsgList: state.chatMsgList.map(chatMsg => {
                    return {
                        ...chatMsg,
                        read: chatMsg.from === action.from && chatMsg.to === action.to ? true : chatMsg.read
                    }
                }),
                unread: state.unread - action.modifyNum
            }
        default:
            return state
    }
}

/**
 *
 * @param msgList：所有的聊天组的聊天内容
 * @param userList：用户的userid对应的头像和名字，用来在聊天页面userid->userName的转换
 * @param allState：所有挂载在store上的state对象，用作获取与自己相关的消息
 * @returns {{type: Symbol, msgList: *, userList: *, allState: *}}
 */
export function msgList(msgList,userList,allState) {
    return {
        type: MSG_LIST,
        msgList,
        userList,
        allState
    }
}

/**
 * 接收消息的action
 * @param msgRec：接收到的消息对象
 * @param allState：所有挂载在store上的state对象，用作获取与自己相关的消息
 * @returns {{type: Symbol, msgRec: *, allState: *}}
 */
export function msgRec(msgRec,allState) {
    return{
        type: MSG_REC,
        msgRec,
        allState
    }
}

/**
 * 已读消息的action
 * @param from：消息的发出者
 * @param to：消息的接收者
 * @param modifyNum：所属聊天组本次已读的消息数
 * @returns {{type: Symbol, from: *, to: *, modifyNum: *}}
 */
export function msgRead({from,to,modifyNum}) {
    return{
        type: MSG_READ,
        from,
        to,
        modifyNum
    }
}

//获取所有聊天组的聊天内容
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

//发送消息
export function sendMsg({from,to,msg}) {
    return dispatch => {
        socket.emit('sendMsg',{from,to,msg});
    }
}

//接收消息
export function recMsg() {
    return (dispatch,getState) => {
        socket.on('recMsg',(msg) => {
            dispatch(msgRec(msg,getState()));
        })
    }
}

//更新已读消息数
export function readMsg(from) {
    return (dispatch,getState) => {
        axios.post('/user/readMsg',{from})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(msgRead({
                        from,
                        to: getState().user._id,
                        modifyNum: res.data.result.modifyNum
                    }))
                }
            })
    }
}


