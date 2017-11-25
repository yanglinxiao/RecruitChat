import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {List, Button, WingBlank, WhiteSpace, InputItem, Radio} from 'antd-mobile';
import Logo from '../../component/logo/logo';
import {validateRegister} from '../../redux/user.redux';
import signForm from '../../component/hoc/sign-form';

@connect(state => state.user, {validateRegister})
@signForm
class Register extends React.Component{

    componentDidMount(){
        this.props.handleChange('type','genius');
    }

    handleRegister(){
        this.props.validateRegister(this.props.state);
    }

    render(){
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={(value)=>this.props.handleChange('userName',value)}>账号</InputItem>
                        <InputItem type="password" onChange={(value)=>this.props.handleChange('password',value)}>密码</InputItem>
                        <InputItem type="password" onChange={(value)=>this.props.handleChange('confirmPwd',value)}>确认密码</InputItem>
                    </List>
                    <RadioItem checked={this.props.state.type === 'genius'} onChange={()=> this.props.handleChange('type','genius')}>牛人</RadioItem>
                    <RadioItem checked={this.props.state.type === 'boss'} onChange={()=> this.props.handleChange('type','boss')}>BOSS</RadioItem>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={()=>this.handleRegister()}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;