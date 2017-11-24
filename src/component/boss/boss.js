import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from "../../redux/chat.redux";
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

@connect(state => state.chat , {getUserList})
class Boss extends React.Component{
    constructor(){
        super();
        this.state = {
            geniusList: []
        }
    }

    componentDidMount(){
        this.props.getUserList('genius');
    }

    render(){
        const CardHeader = Card.Header;
        const CardBody = Card.Body;
        return(
            <WingBlank>
                {this.props.userList.map((genius,index) => {
                    return (genius.avatar ?
                        <div key={index}>
                            <WhiteSpace></WhiteSpace>
                            <Card>
                                <CardHeader title={genius.userName}
                                            thumb={require(`../img/${genius.avatar}.png`)}
                                            extra={genius.title}>
                                </CardHeader>
                                <CardBody>
                                    <div>
                                        {genius.desc.split('\n').map((line,index) => {
                                            return (
                                                <p key={index}>{line}</p>
                                            )
                                        })}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        : null)
                })}
            </WingBlank>
        )
    }
}

export default Boss;