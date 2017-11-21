import React from 'react';
import './logo.css';
import logoImg from './logo.png';

class Logo extends React.Component{
    render(){
        return(
            <div className="logo">
                <img src={logoImg} alt="logo"/>
            </div>
        )
    }
}

export default Logo;