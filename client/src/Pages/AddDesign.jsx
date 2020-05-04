import React from 'react'
import {withRouter} from 'react-router-dom'

class AddDesign extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            file: '',
            user: {},
            message: ''
        }

        this.createDesign = this.createDesign.bind(this)
    }

    createDesign(){

        var formdata = new FormData()
        formdata.append('design', this.state.file)
        formdata.append('file','figure this outplease')

        fetch('/api/design/create', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formdata)
        }).then(resp => resp.json())
        .then(data => this.setState({message: data.data}))
    }

    componentDidMount(){
        fetch('/api/auth/curruser')
        .then(resp => resp.json())
        .then(data => this.setState({user: data.data}))
    }

    render(){
        return (
            <div>
                Upload File: <input type="file" onChange={(event)=> this.setState({file: event.target.files[0]})}/>
                <button onClick={this.createDesign}>Upload Your Design</button>
                {this.state.message}
            </div>
        )
    }

}

export default withRouter(AddDesign)