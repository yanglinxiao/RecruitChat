import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

@withRouter
class AuthRoute extends React.Component{
    componentDidMount(){
        const {location,history} = this.props;
        const signList = ['/login','/register'];
        if(signList.includes(location.pathname)){
            return null;
        }
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200){
                    if(res.data.code){
                        // 已经登录了
                    }else{
                        history.push('/login');
                    }
                }
            })
    }

    render(){
        return(
            <div></div>
        )
    }
}

export default AuthRoute;