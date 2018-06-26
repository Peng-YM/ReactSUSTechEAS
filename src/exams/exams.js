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
    DateField,
    EditButton,
    ShowButton,
    Create,
    SimpleFormLayout,
    DisabledField,
    TextInput,
    required
} from 'react-admin';

import { DateInput } from 'react-admin-date-inputs';
import AssementIcon from '@material-ui/icons/Assessment';


export const ExamIcon = AssementIcon;

export const ExamShow = props => (
    <Show title = "Show" {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="examName"/>
            <DateField source="date" options={{format:'yyyy-MM-dd'}}/>
        </SimpleShowLayout>
    </Show>
);

export const ExamEdit = props => (
    <Edit title="Edit" {...props}>
        <TabbedForm>
            <FormTab label="summary">
                <DisabledField source="id"/>
                <TextInput source="examName" validate={required()}/>
                <DateInput source="date" validate={required()} options={{format:'yyyy-MM-dd'}}/>
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
            <ShowButton/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const ExamCreate = props => (
    <Create {...props}>
        <SimpleFormLayout>
            <TextInput source="examName" validate={required()}/>
            <DateInput source="date" validate={required()} options={{format:'yyyy-MM-dd'}}/>
        </SimpleFormLayout>
    </Create>
);