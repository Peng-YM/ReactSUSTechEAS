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
    required,
    ImageField
} from 'react-admin';
import PeopleIcon from '@material-ui/icons/People';
import {AvatarField} from '../utils/customization';
import RolesManager from './rolesManager';

export const UserIcon = PeopleIcon;

export const UserTitle = ({record}) => {
    return (<span>{record ? `${record.firstName}  ${record.lastName}` : ''}</span>);
};

export const UserList = props => (
    <List 
        {...props}
        sort={{field: 'id', order: 'ASC'}}>
        <Datagrid hover={false}>
            <AvatarField source = "avatar" />
            <TextField source="id" />
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
    <Edit title={<UserTitle/>} {...props}>
        <SimpleForm>
            <ImageField source = "avatar" label="Avatar"/>
            <TextInput source="avatar" />
            <DisabledInput source="id"/>
            <EmailField source="email"/>
            <TextInput source="firstName" validate={required()}/>
            <TextInput source="lastName" validate={required()}/>
            <TextInput source="phone"/>
            <UserRoles />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ImageField source='avatar' label="Avatar"/>
            <TextInput source='avatar' label="Avatar"/>
            <TextInput source='email' validate={required()} type="email"/>
            <TextInput source='firstName' validate={required()}/>
            <TextInput source='lastName' validate={required()}/>
            <TextInput source='password' validate={required()} type="password"/>
            <TextInput source='phone'/>
        </SimpleForm>
    </Create>
);


export const UserShow = props => (
    <Show title={<UserTitle/>} {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <ImageField source='avatar' label="Avatar"/>
                <TextField source="id"  />
                <EmailField source="email" />
                <TextField source="firstName"/>
                <TextField source="lastName" />
                <TextField source="phone" />
            </Tab>
            <Tab label="courses">
                <ReferenceManyField addLabel={false} reference="courses" target="users">
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="courseCode" />
                        <TextField source="courseName"/>
                        <ShowButton/>
                    </Datagrid>   
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);


export const UserRoles = ({record}) => {
    return (
        <div>
            <RolesManager source={record}/>
        </div>
    );
}