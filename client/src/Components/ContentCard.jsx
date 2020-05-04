import React from 'react'

import {withRouter} from 'react-router-dom'

import './styles.css'

class ContentCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            image: this.props.image,
            username: this.props.username,
            likes: this.props.likes,
            postID: this.props.postID
        }

        this.likePost = this.likePost.bind(this)
        this.redirectToPost = this.redirectToPost.bind(this)
    }

    likePost(){
        fetch('/api/design/like', {
            method: 'post',
            headers: {
                "Content-Type":'application/json'
            },
            body: JSON.stringify({
                postID: this.state.postID
            })
        }).then(resp => resp.json())
        .then(data => console.log(data))
    }

    redirectToPost(){
        this.props.history.push(`/post/${this.state.postID}`)
    }

    render(){
        return (
            <div id = "card">
                <div><img alt = "design" className = "image" src = {this.state.image}/></div>
        
                <div className="details">
                    <div className="username">{this.state.username}</div>
                    <div className="likedby">likes: {this.state.likes.length}</div>
                    <button onClick={this.likePost}>like</button>
                </div>
                <button onClick = {() => this.redirectToPost()}>View Post</button>
            </div>
        )
    }
}

export default withRouter(ContentCard)