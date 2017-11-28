import React from 'react';
import {connect} from 'react-redux';
import {List, InputItem, NavBar} from 'antd-mobile';
import {getMsgList, recMsg, sendMsg} from '../../redux/chat.redux';
import './chat.css';

@connect(state => state, {getMsgList,recMsg,sendMsg})
class Chat extends React.Component{

    constructor(){
        super();
        this.state = {
            text: ''
        }
    }

    componentDidMount(){
        this.props.getMsgList();
        this.props.recMsg();
    }

    handleSubmit(){
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({text:''})
    }

    render(){
        const userid = this.props.match.params.userid;
        console.log(this.props);
        return(
            <div className="chat-page">
                <NavBar>{userid}</NavBar>
                {this.props.chat.chatMsgList.map((msg,index) => {
                return (msg.from === userid ?
                    <p key={index}>对方发来的：{msg.content}</p>
                    : <p key={index}>自己发出的：{msg.content}</p>
                )

            })}
                <div className="input-footer">
                    <List>
                        <InputItem
                            placeholder="请输入..."
                            value={this.state.text}
                            onChange={(value)=>this.setState({text:value})}
                            extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat;