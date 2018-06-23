import React from 'react';

import {
    List,
    Datagrid,
    TextField,
    ShowButton,
    EditButton
} from 'react-admin';


export const ResourceList = props => (
    <List {...props}
        sort={{field: 'id', order: 'ASC'}}>
        <Datagrid hover={false}>
            <TextField source="name" />
            <TextField source="url" />
            <TextField source="time"/>
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);