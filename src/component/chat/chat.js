import React from 'react';
import {connect} from 'react-redux';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {getMsgList, recMsg, sendMsg} from '../../redux/chat.redux';
import './chat.css';
import {getChatId} from "../../util";

@connect(state => state, {getMsgList,recMsg,sendMsg})
@withRouter
class Chat extends React.Component{

    constructor(){
        super();
        this.state = {
            text: '',
            showEmoji: false
        }
    }

    //获取消息列表和监听消息的接受
    componentDidMount(){
        if(!this.props.chat.chatMsgList.length){
            this.props.getMsgList();
            this.props.recMsg();
        }
        this.emitResizeEvent();
    }

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
        const {userid} = this.props.match.params;
        const chatid = getChatId(userid,this.props.user._id);
        let {userList,chatMsgList} = this.props.chat;
        chatMsgList = chatMsgList.filter((chatMsg) => chatMsg.chatid === chatid);
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