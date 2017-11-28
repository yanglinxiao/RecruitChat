import React from 'react';
import {Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import { NavBar } from 'antd-mobile';
import Tabs from '../../component/tabs/tabs';
import './dashboard.css';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import My from '../../component/my/my';

function Message() {
    return <h3>信息页面</h3>
}

@connect(state => state)
class DashBoard extends React.Component{
    render(){
        const {user,location} = this.props;
        const navList = [
            {
                path:'/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path:'/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path:'/message',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Message
            },
            {
                path:'/my',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: My
            }
        ];
        const title = location.pathname !== '/' ? navList.find(nav => nav.path === location.pathname).title : '';
        return(
            <div className="dashboard">
                <NavBar mode="dark">{title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        <Route path="/boss" component={Boss}></Route>
                        <Route path="/genius" component={Genius}></Route>
                        <Route path="/message" component={Message}></Route>
                        <Route path="/my" component={My}></Route>
                    </Switch>
                </div>
                <Tabs className="tabs" tabList={navList}></Tabs>
            </div>
        )
    }
}

export default DashBoard;