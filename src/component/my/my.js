import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { Result, WhiteSpace, List, Button, WingBlank, Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies';
import {logout} from '../../redux/user.redux';
import './my.css';

@connect(state => state.user ,{logout})
class My extends React.Component{

    handleLogout(){
        const alert = Modal.alert;
        alert('注销', '确定退出登录?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookies.erase('userid');
                this.props.logout();
            }}
        ])
    }

    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        const {userName,avatar,type,company,desc,title,redirectTo} = this.props;
        return userName ? (
            <div className="result">
                <Result
                img={<img src={require(`../img/${avatar}.png`)} alt="avatar" />}
                    title={userName}
                    message={type === 'boss' ? company : null}
                />
                <List renderHeader={() => '简介'}>
                    <Item multipleLine >
                        {title}
                        <Brief>{desc.split('\n').map((line,index) => <p key={index}>{line}</p>
                        )}</Brief>
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <Button type="primary" onClick={()=>this.handleLogout()}>退出登录</Button>
                </WingBlank>
            </div>
        ) : <Redirect to={redirectTo}></Redirect>
    }
}

export default My;