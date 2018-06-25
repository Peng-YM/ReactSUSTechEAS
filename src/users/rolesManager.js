import React, { Component } from 'react';
import {getList, getManyReference, isIdExists, setManyReference} from '../utils/api';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List'; 
import ListItem from '@material-ui/core/ListItem'; 
import ListItemText from '@material-ui/core/ListItemText';

class RolesManager extends Component{
    constructor(props){
        super(props);
        this.users = props.source;
        this.state = {
            // all users
            roles: [],
             // roles selected to assign to users
            selected: [],
        };
    }

    componentDidMount(){
        getList("roles")
            .then(roles => this.setState({roles: roles}));
        // get user that already choose the roles
        getManyReference("users", "roles", this.users)
            .then(selected => this.setState({selected: selected[0]}));
    }

    render(){
        const roleList = this.state.roles.map(((role) => ( 
            <ListItem>   
            <Checkbox key={role.id}
                onChange={
                    (role) => { 
                        let index = isIdExists(this.state.selected, role.id);
                        if (index === -1) {
                            let temp = this.state.selected.slice();
                                temp.push(role);
                                this.setState({selected: temp}, this.submit);
                        }
                        else if (index !== -1) {
                            let temp = this.state.selected.slice();
                            temp.splice(index, 1);
                            this.setState({selected: temp}, this.submit);
                        }
                    }
                }
                checked={isIdExists(this.state.selected, role.id) !== -1 ? true : false}
            />
            <ListItemText primary={role.name} />
           </ListItem>
        )));
        return (
        <List>
            {roleList}
        </List>
        );
    }

    submit(){
        setManyReference("roles", this.users, this.state.selected);  
    }
}

RolesManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default RolesManager;