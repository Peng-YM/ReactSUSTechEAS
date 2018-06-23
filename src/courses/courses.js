import React from 'react';

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
    ChipField
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';
import BookIcon from '@material-ui/icons/Book';

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
            </Tab>
            <Tab label="description">
                <RichTextField source="description" addLabel={false}/>
            </Tab>
            <Tab label="exams">
                <ReferenceManyField addLabel={false} reference="exams" target="courses">
                    <Datagrid>
                        <TextField source="id"/>
                        <TextField source="examName"/>
                        <EditButton/>
                        <ShowButton/>
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="teachers">
                <ReferenceManyField addLabel={false} reference="teachers" target="courses">
                    <Datagrid>
                        <TextField source="id"/>
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="students">
            <ReferenceManyField addLabel={false} reference="students" target="courses">
                    <Datagrid>
                        <TextField source="id"/>
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
            </FormTab>
            <FormTab label="description">
                <RichTextInput source="description" addLabel={false}/>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const CourseCreate = props => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="summary">
                <TextInput label="Course Code" source="courseCode" />
                <TextInput label="Course Name" source="courseName" />
            </FormTab>
            <FormTab label="summary">
                <RichTextInput addLabel={false} source="decription"/>
            </FormTab>
        </TabbedForm>
    </Create>
);