import React from 'react'
import {withRouter} from 'react-router-dom'

class AddDesign extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            file: '',
            fileUrl: '',
            user: {},
            message: ''
        }

        this.createDesign = this.createDesign.bind(this)
    }

    createDesign(){

        var formdata = new FormData()

        console.log(this.state.file)
       
        formdata.append('design', this.state.file)
        formdata.append('file','figure this outplease')

        fetch('/api/design/create', {
            method: 'post',
            body: formdata
        }).then(resp => resp.json())
        .then(data =>  this.setState({message:data.data}))
       
    }

    componentDidMount(){
        fetch('/api/auth/curruser')
        .then(resp => resp.json())
        .then(data => this.setState({user: data.data}))
    }

    render(){
        return (
            <div>
                <div>
                Upload File: <input type="file" onChange={(event)=> {this.setState({file: event.target.files[0]}); console.log(event.target.files[0])}}/>
                </div>
                <div>
                <button onClick={this.createDesign}>Upload Your Design</button>
                </div>
                {/* <img src={URL.createObjectURL(this.state.file)} alt="preview"/> */}
                <div>
                {this.state.message}
                </div>
                
            </div>
        )
    }

}

export default withRouter(AddDesign)