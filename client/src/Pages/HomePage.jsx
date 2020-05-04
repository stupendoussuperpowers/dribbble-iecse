import React, {Component} from 'react'
import ContentCard from '../Components/ContentCard'
import {withRouter} from 'react-router-dom'

import './styles.css'

class HomePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            designList: [],
            user: ''
        }
    }

    componentDidMount(){
        fetch('/api/design/explore')
        .then(resp => resp.json())
        .then(data => {
            this.setState({designList: data.data})
        })

        fetch('/api/auth/curruser')
        .then(resp => resp.json())
        .then(data => {
            this.setState({username: data.data})
        })

    }

    render(){
        return(
            <div>
                <div className="title">
                   Explore Page
                </div>
                <div className="postexplore">
                {
                    this.state.designList.map(
                        value => {
                            return (
                                <div key = {value._id}>
                                    <ContentCard postID = {value._id} image={value.design_url} username={value.author} likes={value.liked_by}  />
                                </div>
                            )
                        }
                    )
                }
                </div>
            </div>
        )
    }

}

export default withRouter(HomePage)