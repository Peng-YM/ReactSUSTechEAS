import React from 'react';
import {
    List,
    Datagrid,
    TextField
} from 'react-admin';


export const roles = props => (
     <List {...props}
        sort={{field: 'roleId', order: 'ASC'}}>
        <Datagrid hover={false}>
            <TextField source="roleId" />
            <TextField source="type" />
        </Datagrid>
    </List>
);