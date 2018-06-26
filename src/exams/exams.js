import React from 'react';

import {
    Show,
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
    DisabledInput,
    TextInput,
    required,
    TabbedShowLayout,
    Tab,
    RichTextField
} from 'react-admin';

import { DateInput } from 'react-admin-date-inputs';
import AssementIcon from '@material-ui/icons/Assessment';
import RichTextInput from 'ra-input-rich-text';


export const ExamIcon = AssementIcon;

const ExamTitle = ({record}) => {
    return (<span>{record ? `${record.examName}` : ''}</span>);
};

export const ExamShow = props => (
    <Show title={<ExamTitle/>} {...props}>
        <TabbedShowLayout>
            <Tab label = "summary">
                <TextField source = "id"/>
                <TextField source = "examName"/>
                <DateField source="date"/>
            </Tab>
            <Tab label = "description">
                <RichTextField source="description" addLabel={false}/>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const ExamEdit = props => (
    <Edit title={<ExamTitle/>} {...props}>
        <TabbedForm>
            <FormTab label="summary">
                <DisabledInput source="id"/>
                <TextInput source="examName" validate={required()} label="Exam Name"/>
                <DateInput source="date" validate={required()} label="date" options={{format:'yyyy-MM-dd'}}/>
            </FormTab>
            <FormTab label="description">
                <RichTextInput source="description" addLabel={false} validate={required()}/>
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
        <TabbedForm>
            <FormTab label="summary">
                <TextInput source="examName" label="Exam Name" validate={required()}/>
                <DateInput source="date" label="Date" validate={required()} options={{format:'yyyy-MM-dd'}}/>
            </FormTab>
            <FormTab label="description">
                <RichTextInput source="description" addLabel={false} validate={required()}/>
            </FormTab>
        </TabbedForm>
    </Create>
);