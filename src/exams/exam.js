import React from 'react';

import {
    Show,
    SimpleShowLayout,
    TextField,
    Edit,
    Datagrid,
    List,
    TabbedForm,
    FormTab,
    DateField
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';
import AssementIcon from '@material-ui/icons/Assessment';


export const ExamIcon = AssementIcon;

export const ExamShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="examName"/>
            <DateField source="date"/>
        </SimpleShowLayout>
    </Show>
);

export const ExamEdit = props => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="summary">
                <TextField source="id"/>
                <TextField source="examName"/>
                <DateField source="date"/>
            </FormTab>
            <FormTab label="description">

            </FormTab>
        </TabbedForm>
    </Edit>
);

export const ExamList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="examName"/>
            <DateField source="date"/>
        </Datagrid>
    </List>
);