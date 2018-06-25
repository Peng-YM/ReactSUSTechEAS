import React, { Component } from 'react';
import {getList, getManyReference, isIdExists, setManyReference} from '../utils/api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

export default class StudentManager extends Component{
    constructor(props){
        super(props);
        this.course = props.source;
        this.state = {
            // all users
            users: [],
            // users that already choose this course
            chosen: []
        };
    }

    componentDidMount(){
        getList("users")
            .then(users => this.setState({users: users}));
        // get user that already choose this course
        getManyReference("courses", "users", this.course)
            .then(chosen => this.setState({chosen: chosen[0]}));
    }

    render(){
        const studentList = this.state.users.map(((user) => (
            <ListItem key={user.id}>
                <ListItemText primary={user.id} />
                <Avatar src={user.avatar} />
                <ListItemText primary={user.firstName} />
                <ListItemText primary={user.lastName} />
                <ListItemSecondaryAction>
                    <Checkbox value="secondary"
                        onChange={
                            () => { 
                                let index = isIdExists(this.state.chosen, user.id);
                                if (index === -1) {
                                    let temp = this.state.chosen.slice();
                                    temp.push(user);
                                    this.setState({chosen: temp}, this.submit);
                                }
                                else if (index !== -1) {
                                    let temp = this.state.chosen.slice();
                                    temp.splice(index, 1);
                                    this.setState({chosen: temp}, this.submit);
                                }
                            }
                        }
                        checked={isIdExists(this.state.chosen, user.id) !== -1 ? true : false}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        )));
        return (
            <List>
                {studentList}
            </List>
        );
    }

    submit(){
        setManyReference("users", this.course, this.state.chosen);
        
    }
}