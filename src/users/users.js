import React from 'react';
import {
    List,
    Datagrid,
    EmailField,
    TextField,
    TextInput,
    ShowButton,
    EditButton,
    DisabledInput,
    SimpleForm,
    Edit,
    Create,
    TabbedShowLayout,
    Show,
    Tab,
    ReferenceManyField
} from 'react-admin';
import PeopleIcon from '@material-ui/icons/People';
import { withStyles } from '@material-ui/core/styles';
import {AvatarField} from '../utils/customization';
import { CourseList } from '../courses/courses.js';

export const UserIcon = PeopleIcon;

export const UserList = props => (
    <List 
        {...props}
        sort={{field: 'id', order: 'ASC'}}>
        <Datagrid hover={false}>
            <TextField source="id" />
            <AvatarField source = "avatar" />
            <EmailField source="email" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="phone"/>
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit title="Edit User Infomation" {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <EmailField source="email"/>
            <TextInput source="firstName"/>
            <TextInput source="lastName"/>
            <TextInput source="phone"/>
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source='email'/>
            <TextInput source='firstName'/>
            <TextInput source='lastName'/>
            <TextInput source='password'/>
            <TextInput source='phone'/>
        </SimpleForm>
    </Create>
);


export const UserShow = props => (
    <Show {...props} title = {<AvatarField size="60" />}>
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField source="id"  />
                <EmailField source="email" />
                <TextField source="firstName"/>
                <TextField source="lastName" />
                <TextField source="phone" />
            </Tab>
            <Tab label="learning courses">
                <ReferenceManyField addLabel={false} reference="learningCourses" target="users">
                    <CourseList/>
                </ReferenceManyField>
            </Tab>
            <Tab label="teaching courses">
                
            </Tab>
        </TabbedShowLayout>
    </Show>
);


