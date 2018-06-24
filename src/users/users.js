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
    ReferenceManyField,
    ChipField,
    SingleFieldList,
    required
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
            <ReferenceManyField reference="roles" target="users" label="Roles">
                <SingleFieldList>
                    <ChipField source="name"/>
                </SingleFieldList>
            </ReferenceManyField>
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
            <TextInput source="firstName" validate={required()}/>
            <TextInput source="lastName" validate={required()}/>
            <TextInput source="phone"/>
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source='email' validate={required()}/>
            <TextInput source='firstName' validate={required()}/>
            <TextInput source='lastName' validate={required()}/>
            <TextInput source='password' validate={required()}/>
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
            <Tab label="courses">
                <ReferenceManyField addLabel={false} reference="courses" target="users">
                    <CourseList/>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);


