import React from 'react'

import {withRouter} from 'react-router-dom'

class LoginPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            alert:''
        }
        this.logIn = this.logIn.bind(this)
    }

    logIn(){
        fetch('/api/auth/login', {
            method: 'post',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        }).then(resp => resp.json())
        .then(data => {
            console.log(data)
            if (data.status !== 200){
                this.setState({alert: data.data})
                return 
            }
            this.props.history.push('/home')
        })
    }

    render(){
        return(
            <div>
                <div className="card">
                    <input type="text" onChange = {(event) => this.setState({username: event.target.value})}/>
                    <input type="password" onChange = {(event) => this.setState({password: event.target.value})}/>
                    <button onClick = {this.logIn}>Login</button>
                    {this.state.username} {this.state.password}
                </div>
            </div>
        )
    }

}

export default withRouter(LoginPage)