import React from 'react';
import {connect} from 'react-redux';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {getMsgList, recMsg, sendMsg, readMsg} from '../../redux/chat.redux';
import './chat.css';
import {getChatId} from "../../util";

@connect(state => state, {getMsgList,recMsg,sendMsg, readMsg})
@withRouter
class Chat extends React.Component{

    constructor(){
        super();
        this.state = {
            text: '',
            showEmoji: false
        }
    }

    /*
     获取消息列表
     监听消息的接收
     把消息已读数更新
     */
    componentDidMount(){
        if(!this.props.chat.chatMsgList.length){
            this.props.getMsgList();
            this.props.recMsg();
        }
        const to = this.props.match.params.userid;
        this.props.readMsg(to);
    }

    // 把消息已读数更新，避免返回消息页面有本次聊天组的信息提示badge
    componentWillUnmount(){
        const to = this.props.match.params.userid;
        this.props.readMsg(to);
    }

    //手动派发resize event，调整后emoji表情显示的bug
    emitResizeEvent(){
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        },0)
    }

    //提交每次聊天的内容到后台
    handleSubmit(){
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({text:''})
    }

    render(){
        const emojiList = '😊 😃 😏 😍 😘 😚 😳 😌 😆 😁 😉 😜 😝 😀 😙 😛 😴 😟 😦 😧 😮 😬 😕 😯 😑 😒 😅 😓 😥 😩 😔 😞 😖 😨 😰 😣 😢 😭 😂 😲 😱 😫 😠 😡 😤 😪 😋 😷 😎 😵 👿 😈 😐 😶 😇 👽 👦 👧 👩 👨 👶 👵 👴 👱 👲 👳 👷 👮 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💂 💀'
            .split(' ')
            .filter(emoji => emoji)
            .map(emoji => ({text: emoji}));
        const Item = List.Item;
        let {userList,chatMsgList} = this.props.chat;
        //根据chatid筛选指定聊天组的聊天内容进行展示
        chatMsgList = chatMsgList.filter((chatMsg) => chatMsg.chatid === getChatId(this.props.match.params,this.props.user._id));
        return userList ? (
                <div className="chat-page">
                    <NavBar icon={<Icon type="left"/>}
                            onLeftClick={() => this.props.history.goBack()}
                    >{userList[userid].userName}</NavBar>
                    <List>
                        {chatMsgList.map((msg,index) => {
                            const avatar = require(`../img/${userList[msg.from].avatar}.png`)
                            return msg.from === userid ?
                                <Item className="others" thumb={avatar} key={index}>{msg.content}</Item>
                                :
                                <Item className="myself" extra={<img src={avatar} alt="avatar"/>} key={index}>{msg.content}</Item>
                        })}
                    </List>
                    <div className="input-footer">
                        <List>
                            <InputItem
                                placeholder="请输入..."
                                value={this.state.text}
                                onChange={(value)=>this.setState({text:value})}
                                extra={
                                    <div>
                                        <span style={{lineHeight: 'normal'}} onClick={()=>{
                                            this.setState({showEmoji:!this.state.showEmoji});
                                            this.emitResizeEvent();
                                        }}>😀</span>
                                        <span onClick={()=>this.handleSubmit()}>发送</span>
                                    </div>
                                }>
                            </InputItem>
                        </List>
                        {this.state.showEmoji ?
                            <Grid
                                data={emojiList}
                                isCarousel={true}
                                columnNum={10}
                                carouselMaxRow={4}
                                onClick={(el)=>this.setState({text:this.state.text + el.text})}>
                            </Grid>
                            : null
                        }
                    </div>
                </div>
            ) : null
    }
}

export default Chat;