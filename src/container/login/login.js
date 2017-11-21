import React from 'react';
import {List, Button, WingBlank, WhiteSpace, InputItem, Radio} from 'antd-mobile';
import Logo from '../../component/logo/logo';

const RadioItem = Radio.RadioItem;
class Login extends React.Component{
    render(){
        return(
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem>账号</InputItem>
                        <InputItem>密码</InputItem>
                    </List>
                    <List>
                        <RadioItem>牛人</RadioItem>
                        <RadioItem defaultChecked>BOSS</RadioItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary">登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;