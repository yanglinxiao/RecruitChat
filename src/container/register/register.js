import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {List, Button, WingBlank, WhiteSpace, InputItem, Radio} from 'antd-mobile';
import Logo from '../../component/logo/logo';
import {validateRegister} from '../../redux/user.redux';

@connect(state => state.user, {validateRegister})
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'genius',
            userName: '',
            password: '',
            confirmPwd: ''
        }
    }

    handleInputChange(key,value){
        this.setState({
            [key]: value
        })
    }

    handleRegister(){
        this.props.validateRegister(this.state);
    }

    render(){
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                {this.props.rediectTo ? <Redirect to={this.props.rediectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={(value)=>this.handleInputChange('userName',value)}>账号</InputItem>
                        <InputItem type="password" onChange={(value)=>this.handleInputChange('password',value)}>密码</InputItem>
                        <InputItem type="password" onChange={(value)=>this.handleInputChange('confirmPwd',value)}>确认密码</InputItem>
                    </List>
                    <RadioItem checked={this.state.type === 'genius'} onChange={()=> this.handleInputChange('type','genius')}>牛人</RadioItem>
                    <RadioItem checked={this.state.type === 'boss'} onChange={()=> this.handleInputChange('type','boss')}>BOSS</RadioItem>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={()=>this.handleRegister()}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;