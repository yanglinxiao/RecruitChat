import React from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

@withRouter
@connect(state => state.chat)
class Tabs extends React.Component{

    static propTypes = {
        tabList: PropTypes.array.isRequired
    }

    render(){
        const TabBarItem = TabBar.Item;
        const {location,history,unread} = this.props;
        let tabList = this.props.tabList.filter(tab => !tab.hide);
        const TabItem = tabList.map((tab,index) => {
            return (<TabBarItem key={index}
                                title={tab.text}
                                icon={{uri: require(`./img/${tab.icon}.png`)}}
                                selectedIcon={{uri: require(`./img/${tab.icon}-active.png`)}}
                                selected={tab.path === location.pathname}
                                onPress={()=>history.push(tab.path)}
                                badge={tab.path === '/message' ? unread : 0}>
            </TabBarItem>)
        })
        return(
            <div>
                <TabBar>
                    {TabItem}
                </TabBar>
            </div>
        )
    }
}

export default Tabs;