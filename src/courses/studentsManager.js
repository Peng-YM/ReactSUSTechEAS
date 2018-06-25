import React, { Component } from 'react';
import {getUsers} from '../utils/api';
import _ from 'underscore';

export default class StudentManager extends Component{
    constructor(props){
        super(props);
        console.log(props.source);
    }
    componentDidMount(){
        getUsers().then(users => {
            _.each(users, user => console.log(user));
        });
    }

    render(){
        return (<span></span>);
    }
}