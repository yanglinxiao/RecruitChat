import React from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { withRouter} from 'react-router-dom';

@withRouter
class UserCard extends React.Component{
    render(){
        const CardHeader = Card.Header;
        const CardBody = Card.Body;
        return(
            <WingBlank>
                {this.props.userList.map((user,index) => {
                    return (user.avatar ?
                        <div key={index}>
                            <WhiteSpace></WhiteSpace>
                            <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                                <CardHeader title={user.userName}
                                            thumb={require(`../img/${user.avatar}.png`)}
                                            extra={user.title}>
                                </CardHeader>
                                <CardBody>
                                    {user.company ? <p>公司：{user.company}</p> : null}
                                    {user.money ? <p>薪资：{user.money}/月</p> : null}
                                    <div>
                                        {user.desc.split('\n').map((line,index) => {
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

export default UserCard;