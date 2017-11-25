import React from 'react';
import {InputItem, NavBar, TextareaItem, WingBlank, Button} from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {update} from '../../redux/user.redux';

@connect(state => state.user,{update})
class GeniusInfo extends React.Component{

    constructor(){
        super();
        this.state = {
            title: '',
            desc: ''
        }
    }

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
                <NavBar mode="dark">牛人信息完善页</NavBar>
                <AvatarSelector selectAvatar={(el)=>this.setState({avatar:el.text})}></AvatarSelector>
                <InputItem onChange={(value)=>this.handleChange('title',value)}>求职岗位</InputItem>
                <TextareaItem onChange={(value)=>this.handleChange('desc',value)} title="个人简介" rows={5}/>
                <WingBlank>
                    <Button type="primary" onClick={()=>this.handleSaveInfo()}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default GeniusInfo;