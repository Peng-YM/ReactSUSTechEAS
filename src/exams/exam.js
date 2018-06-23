import React from 'react';

import {
    Show,
    SimpleShowLayout,
    TextField,
    Edit,
    Datagrid
} from 'react-admin';
import { List } from '@material-ui/core';

export const ExamShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="examName"/>
        </SimpleShowLayout>
    </Show>
);

export const ExamEdit = props => (
    <Edit>
        
    </Edit>
);