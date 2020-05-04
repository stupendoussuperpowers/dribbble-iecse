import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';


class RegisterPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            password2: '',
            email: '',
            alert:''
        }
        this.register = this.register.bind(this)
    }

    register(){
        console.log("here we are")
        fetch('/api/auth/register', {
            method: 'post',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                password2: this.state.password2,
                email: this.state.email
            })
        }).then(resp => resp.json())
        .then(data => {
            console.log("Sooomething")
            if (data.status !== 200){
                this.setState({alert: data.data})
                return 
            }
            this.props.history.push('/login')
        })
    }

    render(){
        return (
            <div>
                <div>
                    <input placeholder= "username" type="text" onChange = {(event) => this.setState({username: event.target.value})}/>
                </div>    
                <div>
                    <input placeholder= "email" type="text" onChange = {(event) => this.setState({email: event.target.value})}/>
                </div>
                <div>
                    <input placeholder = "password" type="password" onChange = {(event) => this.setState({password: event.target.value})}/>
                </div>
                <div>
                    <input placeholder = "confirm password" type="password" onChange = {(event) => this.setState({password2: event.target.value})}/>
                </div>
                    <button onClick = {this.register}>Register</button>
               
            </div>
        )
    }

}

export default withRouter(RegisterPage)