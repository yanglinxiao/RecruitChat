import React from 'react';
import {connect} from 'react-redux';
import UserCard from '../user-card/user-card';
import {getUserList} from "../../redux/chat.user.redux";

@connect(state => state.chatUser, {getUserList})
class Genius extends React.Component{

    componentDidMount(){
        this.props.getUserList('boss');
    }

    render(){
        return (
            <UserCard userList={this.props.userList}></UserCard>
        )
    }
}

export default Genius;