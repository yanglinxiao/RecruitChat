import React from 'react';
import { Grid,List } from 'antd-mobile';
import  PropTypes from "prop-types";
import './avatar-selector.css';

class AvatarSelector extends React.Component{

    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }

    constructor(){
        super();
        this.state = {};
    }

    selectAvatar(el,index){
        this.setState(el);
        this.props.selectAvatar(el);
    }

    render(){
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
            .split(',')
            .map((name) => ({
                icon: require(`../img/${name}.png`),
                text: name
            }))
        const gridHeader = this.state.icon ?
            (<div className="header">
                <span>已选择头像:</span>
                <img src={this.state.icon} alt="avatar"/>
            </div>)
            : <div>请选择头像</div>

        return(
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid data={avatarList}
                          activeStyle={true}
                          columnNum={5}
                          onClick={(el,index)=>this.selectAvatar(el,index)}/>
                </List>
            </div>
        )
    }
}

export default AvatarSelector;