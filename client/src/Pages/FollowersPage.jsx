import React, {Component} from 'react'
import ContentCard from '../Components/ContentCard'
import {withRouter} from 'react-router-dom'

import './styles.css'

class FollowersPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userID: this.props.userID,
            list: [],
            actualList: []
        }
    }

    componentDidMount(){
        fetch(`/api/profile/${this.state.userID}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({list: data.data.followers})
        })
    }

    render(){
        return(
            <div>
                <div className="title">
                   Followers Page
                </div>
                <div className="">
                {
                    this.state.list.map(
                        value => {
                            return (
                                <div>
                                    {value}
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

export default withRouter(FollowersPage)