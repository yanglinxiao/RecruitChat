import React from 'react';
import {InputItem, NavBar, TextareaItem, WingBlank, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import  AvatarSelector from '../../component/avatar-selector/avatar-selector';
import {update} from '../../redux/user.redux';

@connect(state=>state.user,{update})
class BossInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            avatar:'',
            title: '',
            company: '',
            money: '',
            desc: '',
        }
    }

    //输入框变化更新state
    handleChange(key,value){
        this.setState({
            [key]: value
        })
    }

    //点击保存
    handleSaveInfo(){
        this.props.update(this.state);
    }

    render(){
        const path  = this.props.location.pathname;
        return(
            <div>
                {this.props.redirectTo && this.props.redirectTo !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">BOSS信息完善页</NavBar>
                <AvatarSelector selectAvatar={(el)=>this.setState({avatar:el.text})}></AvatarSelector>
                <InputItem onChange={(value)=>this.handleChange('title',value)}>职位名称</InputItem>
                <InputItem onChange={(value)=>this.handleChange('company',value)}>公司名称</InputItem>
                <InputItem onChange={(value)=>this.handleChange('money',value)}>每月薪资</InputItem>
                <TextareaItem onChange={(value)=>this.handleChange('desc',value)} title="职位描述" rows={5} placeholder="职位要求和描述"/>
                <WingBlank>
                    <Button type="primary" onClick={()=>this.handleSaveInfo()}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default BossInfo;