import React from 'react';

export default function signForm(Comp) {
   class WrapperComp extends React.Component{
        constructor(props){
            super(props);
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(key,value){
            this.setState({
                [key]: value
            })
        }

        render(){
            return(
                <Comp {...this.props} state={this.state} handleChange={this.handleChange}></Comp>
            )
        }
    }
    return WrapperComp;
}