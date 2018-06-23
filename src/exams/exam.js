import React from 'react';

import {
    Show,
    SimpleShowLayout,
    TextField,
    Edit,
    Datagrid,
    List,
    TabbedForm,
    FormTab
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

export const ExamShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="examName"/>
        </SimpleShowLayout>
    </Show>
);

export const ExamEdit = props => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="summary">
                <TextField source="id"/>
                <TextField source="examName"/>
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
        </Datagrid>
    </List>
);