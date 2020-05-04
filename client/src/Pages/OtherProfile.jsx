import React, {Component } from 'react'

import {withRouter} from 'react-router-dom'

import ContentCard from '../Components/ContentCard'

class OtherProfile extends React.Component {
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
            userID: this.props.userID
        }
        this.followUser = this.followUser.bind(this)
    }

    componentDidMount(){
        fetch(`/api/profile/${this.state.userID}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            this.setState({user: data.data}, () => console.log(this.state))
        })
    }

    followUser(){
        fetch('/api/profile/follow', {
            method: 'post',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                messiah: this.state.userID
            })
        }).then(resp => resp.json())
        .then(data => console.log(data))
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
                    </div>
                    <div className="">
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.followUser}>Follow</button>
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
        )
    }

}

export default withRouter(OtherProfile)