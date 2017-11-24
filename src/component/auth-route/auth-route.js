import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadData} from '../../redux/user.redux';

@connect(null,{loadData})
@withRouter
class AuthRoute extends React.Component{
    componentDidMount(){
        const {location,history,loadData} = this.props;
        const signList = ['/login','/register'];
        if(signList.includes(location.pathname)){
            return null;
        }
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200){
                    if(!res.data.code){
                        //已经登录
                        loadData(res.data.result);
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