import React from 'react';
import {
  fetchUtils,
  Admin,
  Resource
} from 'react-admin';
import jsonHalRestProvider from 'hal-json-data-provider';
import {
  UserList,
  UserIcon,
  UserEdit,
  UserCreate,
  UserShow
} from './users/users';
import {
  CourseList,
  CourseShow,
  CourseEdit,
  CourseCreate,
  CourseIcon
} from './courses/courses';
import authProvider from './authProvider';
import {
  ExamShow,
  ExamList,
  ExamEdit,
  ExamIcon,
  ExamCreate
} from './exams/exams';
import DashBoard from './Dashboard';
import './css/App.css';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
      options.headers.set('Authorization', localStorage.getItem('token'));
  }
  return fetchUtils.fetchJson(url, options);
}

const dataProvider = jsonHalRestProvider('http://10.20.20.126:8080', httpClient);
const App = () =>(
  <Admin  dashboard={DashBoard} title="SUSTech EAS" authProvider={authProvider} dataProvider={dataProvider}>
    <Resource 
      name="users"
      options ={{label: 'Users'}}
      list={UserList}
      edit={UserEdit}
      icon={UserIcon}
      create={UserCreate}
      show={UserShow}/>
    <Resource
      name="courses"
      show={CourseShow}
      edit={CourseEdit}
      options={{lable: "Courses"}}
      list={CourseList}
      icon={CourseIcon}
      create={CourseCreate}/>   
    <Resource
      name="exams"
      show={ExamShow}
      edit={ExamEdit}
      options={{label: "Exams"}} 
      list={ExamList}
      create={ExamCreate}
      icon={ExamIcon}/>
    <Resource
      name="roles"/>
    <Resource
      name="resources"/>
  </Admin>
);

export default App;
