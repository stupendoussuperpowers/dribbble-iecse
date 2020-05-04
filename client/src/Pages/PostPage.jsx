import React from 'react'
import {withRouter} from 'react-router-dom'

import './styles.css'

class PostPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            postID: this.props.postID,
            post: {
                comments: [],
                liked_by: []
            },
            commentBody: ''
        }
        this.postComment = this.postComment.bind(this)
    }

    postComment(){
        fetch('/api/comment/add', {
            method: 'post',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                parent: this.state.postID,
                content: this.state.commentBody
            })
        }).then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({commentBody: ''}, ()=>{})
        })
    }

    componentDidMount(){

        fetch(`/api/design/${this.state.postID}`)
        .then(resp => resp.json())
        .then(data => this.setState({post: data.data}, () => console.log(this.state)))
    }

    render(){
        return (
            <div className="page">
                <div className="post">
                    <img src = {this.state.post.design_url} alt = "design" className = "image"/>
                    <div className = "details">
                        <div>
                        {this.state.post.author}
                        </div>
                        <div>
                            {this.state.post.liked_by.length} likes  
                        </div>
                    </div>
                    Comments:
                    <div>
                        <input type="text" onChange={(event) => this.setState({commentBody: event.target.value})}/>
                        <button onClick={this.postComment}>Comment</button>
                    </div>
                    <div>
                        {
                            this.state.post.comments.map(value => {
                                return (
                                    <div key = {value._id}>
                                        {value.author} : {value.content}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PostPage)