import React from 'react';
import {List, Badge} from 'antd-mobile';
import {connect} from 'react-redux';

@connect(state => state)
class Message extends React.Component{

    //获取聊天中最后一条消息
    getLastMsg(arr){
        return arr[arr.length-1]
    }

    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.user._id;
        const {chatMsgList,userList} = this.props.chat;
        const msgGroup = {};//用来存放不同的聊天组，key为chatid,value为聊天内容(数组)
        //消息列表按照chatid分类，不同的chatid代表不同的聊天组
        chatMsgList.forEach((chatMsg) => {
            msgGroup[chatMsg.chatid] = msgGroup[chatMsg.chatid] || [];
            msgGroup[chatMsg.chatid].push(chatMsg);
        })
        //根据最后一条消息的时间进行消息列表的排序
        const msgGroupValueList =  Object.values(msgGroup).sort((msgGroupValue1,msgGroupValue2) => {
            const create_time1 = this.getLastMsg(msgGroupValue1).create_time;
            const create_time2 = this.getLastMsg(msgGroupValue2).create_time;
            return create_time2 - create_time1;
        });
        return(
            <div>
                <List>
                    {msgGroupValueList.map((msgGroupValue,index) => {
                        const lastMsg = this.getLastMsg(msgGroupValue);
                        const oppositeId  = lastMsg.to === userid ? lastMsg.from : lastMsg.to;//获取聊天组中对方的userid
                        const unreadCount = msgGroupValue.filter((msg) => !msg.read && msg.to === userid).length;//获取聊天组中未读的消息数量
                        return (
                            <Item key={index}
                                  thumb={require(`../img/${userList[oppositeId].avatar}.png`)}
                                  extra={<Badge text={unreadCount}/>}
                                  arrow="horizontal"
                                    onClick={()=>{this.props.history.push(`/chat/${oppositeId}`)}}>
                                {lastMsg.content}
                                <Brief>{userList[oppositeId].userName}</Brief>
                            </Item>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default Message;