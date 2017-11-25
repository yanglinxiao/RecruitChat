import React from 'react';
import {List, Button, WingBlank, WhiteSpace, InputItem} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {validateLogin} from '../../redux/user.redux';
import Logo from '../../component/logo/logo';
import signForm from '../../component/hoc/sign-form';

@connect(state => state.user, {validateLogin})
@signForm
class Login extends React.Component{

    handleChange(key,value){
        this.setState({
            [key]: value
        })
    }

    handleLogin(){
        this.props.validateLogin(this.props.state);
    }

    skipToRegister(){
        this.props.history.push('/register');
    }

    render(){
        const {redirectTo,location} = this.props;
        return(
            <div>
                {redirectTo && location.pathname !== redirectTo ? <Redirect to={redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={(value)=>this.props.handleChange('userName',value)}>账号</InputItem>
                        <InputItem type="password" onChange={(value)=>this.props.handleChange('password',value)}>密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={()=>this.handleLogin()}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={()=>this.skipToRegister()}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;