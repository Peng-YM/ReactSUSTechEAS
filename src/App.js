import React, { Component } from 'react';
import { fetchUtils, Admin, Resource } from 'react-admin';
import jsonHalRestProvider from 'ra-data-json-hal';
import {UserList, UserIcon, UserEdit, UserCreate, UserShow} from './users/users';
import {CourseList, CourseShow, CourseEdit, CourseCreate, CourseTitle} from './courses/courses';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { ExamShow, ExamList } from './exams/exam';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
      options.headers.set('Authorization', 'Basic cGVuZ3ltQHFxLmNvbToxMjM0NTY=');
  }
  return fetchUtils.fetchJson(url, options);
}

const dataProvider = jsonHalRestProvider('http://10.20.20.126:8080', httpClient);
const App = () =>(
  <Admin title="SUSTech EAS" dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    <Resource 
      name="users"
      options ={{label: 'Users'}}
      list={UserList}
      edit={UserEdit}
      icon={UserIcon}
      create={UserCreate}
      show={UserShow}
    />
    <Resource
      name="courses"
      show={CourseShow}
      edit={CourseEdit}
      options={{lable: "Courses"}}
      list={CourseList}
      create={CourseCreate}
    />   
    <Resource
      name="exams"
      show={ExamShow}
      options={{label: "Exams"}}
    />
  </Admin>
);

export default App;
