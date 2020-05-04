import React from 'react'
import {withRouter} from 'react-router-dom'

import './styles.css'

class PostPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            postID: this.props.postID,
            post: {}
        }

    }

    componentDidMount(){

        console.log(this.state)

        fetch(`/api/design/${this.state.postID}`)
        .then(resp => resp.json())
        .then(data => this.setState({post: data.data}))
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
                            {this.state.post.likes} likes  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PostPage)