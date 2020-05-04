import React, {Component } from 'react'

import {withRouter} from 'react-router-dom'

import ContentCard from '../Components/ContentCard'

class ProfilePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: {
                followers: [],
                designs: [],
                following: [],
                _id: "",
                username: "",
                email: "",
                bio: ""
            },
            biotext: '',
            biobool: false,
            loaded: false
        }
    }

    componentDidMount(){
        fetch('/api/auth/curruser')
        .then(resp => resp.json())
        .then(data => {
            this.setState({user: data.data, loaded: true}, () => console.log(this.state))
        })

        this.editBio = this.editBio.bind(this)
    }

    editBio(){
        fetch('/api/profile/addbio', {
            method: 'post',
            headers: {
                "Content-Type":"application/json"
            }, 
            body: JSON.stringify({
                'bio': this.state.biotext
            })
        }).then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }

    render(){
        return(
            <div>
                <div className="title">
                   {this.state.user.username}
                </div>
                <div className="userdetails">
                <div className = "firstcol">
                <div>
                    {this.state.user.bio}
                    {
                        !this.state.biobool ?
                        
                            <button onClick = {() => this.setState({biobool: true})}> Edit Bio</button>
                        
                        :<div>
                            <input type="textfield" onChange = {(event) => this.setState({biotext: event.target.value})} />
                            <button onClick = {this.editBio} >Update Bio </button>
                        </div>
                    }
                </div>
                <div className="">
                    {this.state.user.email}
                </div>
                </div>

                <div className = "secondcol">
                <div>
                    Followers: {this.state.user.followers.length}
                </div>
                <div>
                    Following: {this.state.user.following.length}
                </div>
                </div>

                </div>
                
                Designs: {this.state.user.designs.length}
                <div className="postgrid">
                {
                    this.state.user.designs.map(value => {
                        return (
                            <div key = {value.design_url}>
                               <ContentCard likes={value.liked_by} postID = {value._id} username={value.author} image={value.design_url}/>
                            </div>
                        )
                    })
                }
                </div>

            </div>
        )
    }

}

export default withRouter(ProfilePage)