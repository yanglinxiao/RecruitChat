import React from 'react';
import {List, Button, WingBlank, WhiteSpace, InputItem} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {validateLogin} from '../../redux/user.redux';
import Logo from '../../component/logo/logo';

@connect(state => state.user, {validateLogin})
class Login extends React.Component{
    constructor(props){
        super(props);
        this.skipToRegister = this.skipToRegister.bind(this);
        this.state = {
            userName: '',
            password: ''
        }
    }

    handleChange(key,value){
        this.setState({
            [key]: value
        })
    }

    handleLogin(){
        this.props.validateLogin(this.state);
    }

    skipToRegister(){
        this.props.history.push('/register');
    }

    render(){
        return(
            <div>
                {this.props.rediectTo ? <Redirect to={this.props.rediectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={(value)=>this.handleChange('userName',value)}>账号</InputItem>
                        <InputItem type="password" onChange={(value)=>this.handleChange('password',value)}>密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={()=>this.handleLogin()}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.skipToRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;