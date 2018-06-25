import React, { Component } from 'react';
import {getList, getManyReference, isIdExists} from '../utils/api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import _ from "underscore";


export default class RolesManager extends Component{
    constructor(props){
        super(props);
        this.users = props.source;
        this.state = {
            // all users
            roles: [],
            // users that already choose this course
            chosen: []
        };
    }

    componentDidMount(){
        getList("roles")
            .then(roles => this.setState({roles: roles}));
        // get user that already choose this course
        getManyReference("courses", "roles", this.course)
            .then(chosen => this.setState({chosen: chosen[0]}));                                
    }

    render(){
        const roleList = this.state.role.map(((role) => (
            <Checkbox value={role.name} checked={true}/>
        )));
        return (
            <List>
                {studentList}
            </List>
        );
    }

    submit(){
        console.log(this.state.chosen);
    }
}