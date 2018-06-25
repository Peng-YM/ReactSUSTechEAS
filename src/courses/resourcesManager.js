import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import {uploadCourseFiles} from '../utils/api';
import DropZone from 'react-dropzone';
import _ from 'underscore';


var buttonStyle = {
    width: "100%"
}

var cardStyle = {
    height: "200px"
}

export default class ResourcesManager extends Component{
    constructor(props){
        super(props);
        this.course = props.source;
        this.state = {
            files: []
        }
    }
    render(){
        return (
        <div>
            <DropZone multiple={true} onDrop={this.onDrop.bind(this)} className="card" style={cardStyle}>
                <div className="card-body align-items-center justify-content-center d-flex">Drops files here</div>
            </DropZone>
            <Button variant="outlined" color="primary" style={buttonStyle} onClick={() => this.upload()}>Upload</Button>
        </div>
    );
    }

    onDrop(files){
        this.setState({files: files});
    }

    upload(){
        uploadCourseFiles(this.course, this.state.files);
    }
}