import React from 'react';

import {
    List,
    Datagrid,
    TextField,
    UrlField
} from 'react-admin';


export const ResourceList = props => (
    <List {...props}
        sort={{field: 'id', order: 'ASC'}}>
        <Datagrid>
            <TextField source="name" />
            <UrlField source="url" />
            <TextField source="fileType"/>
            <SizeField source="size"/>
        </Datagrid>
    </List>
);

export const SizeField = ({record, ...rest}) => {
    let size = parseInt(record.size);
    let k = 1000;
    let kb = Math.pow(k, 2);
    let mb = Math.pow(k, 3);
    if(size < kb)
        return <span>{`${parseInt(size / 1000)} KB`}</span>;
    else if(size < mb)
        return <span>{`${parseInt(size / kb)} MB`}</span>;
}