import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    Datagrid,
    TextField,
    ShowButton,
    EditButton,
    Show,
    TabbedShowLayout,
    Tab,
    RichTextField,
    TabbedForm,
    FormTab,
    DisabledInput,
    TextInput,
    Edit,
    required,
    Create,
    ReferenceManyField,
    SingleFieldList,
    ChipField,
    EmailField,
    DateField,
    DateInput
} from 'react-admin';

import {getUsers} from '../utils/api';

import RichTextInput from 'ra-input-rich-text';
import BookIcon from '@material-ui/icons/Book';
import Button from '@material-ui/core/Button';
import {List as OriginalList} from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';



export const CourseIcon = BookIcon;

export const CourseList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="courseCode" />
            <TextField source="courseName"/>
            <ReferenceManyField label="Exams" reference="exams" target="courses">
                <SingleFieldList>
                    <ChipField source="examName"/>
                </SingleFieldList>
            </ReferenceManyField>
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

const CourseTitle = ({record}) => {
    return (<span>{record ? `${record.courseName}` : ''}</span>);
};


export const CourseShow = props => (
    <Show title={<CourseTitle/>} {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField source="id" />
                <TextField source="courseCode" />
                <TextField source="courseName"/>
                <DateField source="start"/>
                <DateField source="end"/>
            </Tab>
            <Tab label="description">
                <RichTextField source="description" addLabel={false}/>
            </Tab>
            <Tab label="exams">
                <ReferenceManyField addLabel={false} reference="exams" target="courses">
                    <Datagrid>
                        <TextField source="id"/>
                        <TextField source="examName"/>
                        <DateField source="date"/>
                        <ShowButton/>
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="users">
                <ReferenceManyField addLabel={false} reference="users" target="courses">
                    <Datagrid>
                        <TextField source="id"/>
                        <EmailField source="email"/>
                        <TextField source="firstName" />
                        <TextField source="lastName" />
                        <ReferenceManyField reference="roles" target="users" label="roles">
                            <SingleFieldList>
                                <ChipField source="name"/>
                            </SingleFieldList>
                        </ReferenceManyField>
                        <ShowButton/>
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="resources">
                <ReferenceManyField addLabel={false} reference="resources" target="courses">
                    <Datagrid>
                        <TextField source="id"/>
                        <TextField source="name"/>
                        <TextField source="link"/>
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const CourseEdit = props => (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="summary">
                <DisabledInput label="Id" source="id"/>
                <TextInput label="Course Code" source="courseCode" validate={required()}/>
                <TextInput label="Course Name" source="courseName" validate={required()}/>
                <DateInput label="Start" source="start" validate={required()}/>
                <DateInput label="End" source="end" validate={required()}/>
            </FormTab>
            <FormTab label="description">
                <RichTextInput source="description" addLabel={false}/>
            </FormTab>
            <FormTab label="students">
                <CourseStudents />
            </FormTab>
            <FormTab label="test">
                <CourseStudents />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const CourseCreate = props => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="summary">
            <TextInput label="Course Code" source="courseCode" validate={required()}/>
                <TextInput label="Course Name" source="courseName" validate={required()}/>
                <DateInput label="Start" source="start" validate={required()}/>
                <DateInput label="End" source="end" validate={required()}/>
            </FormTab>
            <FormTab label="summary">
                <RichTextInput addLabel={false} source="decription" validate={required()}/>
            </FormTab>
        </TabbedForm>
    </Create>
);

const CourseStudents = ({record}) => {
    const classes = PropTypes.object.isRequired;
    const courseId = record.id;
    return (
        <div className={classes.root}>

            <Button variant="raised" color="secondary" 
                className={classes.button} 
                onClick={
                    event=>{
                        getUsers().then(res => console.log(res))
                    }
                }>CONFIRM</Button>
        </div>
    );
};