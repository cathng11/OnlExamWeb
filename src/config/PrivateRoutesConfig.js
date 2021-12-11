import React from 'react';
import NotFound from '../views/Common/NotFound';
import Dashboard from '../views/Dashboard/Dashboard';
import MyAccount from '../views/MyAccount';
import MyProfile from '../views/MyProfile';
import StudentAssignment from '../views/Role.Student/Assignment';
import DoAssignment from '../views/Role.Student/Assignment/DoAssignment';
import StudentResult from '../views/Role.Student/Result';
import CreateNewAssignment from '../views/Role.Teacher/Classes/Assignments/CreateNew';
import Classes from '../views/Role.Teacher/Classes';
import ListStudents from '../views/Role.Teacher/Classes/Students';
import Library from '../views/Role.Teacher/Library';
import ListQuestions from '../views/Role.Teacher/Library/ListQuestions';
import DetailResult from '../views/Role.Teacher/Classes/Results/DetailResult';
import ListResultInClass from '../views/Role.Teacher/Classes/Results/ListResultInClass';
import ListAssignmentsInClass from './../views/Role.Teacher/Classes/Assignments/ListAssignmentsInClass';
import Roles from './Roles';
import ClassRoom from './../views/Role.Teacher/Classes/ClassRoom';
import Performance from '../views/Role.Teacher/Classes/Performance';

const PrivateRoutesConfig = [

    //Common Views
    {
        path: '/',
        exact: true,
        title: 'Dashboard',
        type: 'MenuLink',
        component: Dashboard,
        permission: [
            Roles.ADMIN,
            Roles.TEACHER,
            Roles.STUDENT
        ],
    },
    {
        path: '/profile',
        exact: true,
        title: 'My Profile',
        type: 'MenuLink',
        component: MyProfile
    },
    {
        path: '/account',
        exact: false,
        title: 'My Account',
        type: 'MenuItem',
        component: MyAccount
    },
    {
        path: '/settings',
        exact: false,
        title: 'Settings',
        type: 'MenuItem',
        component: () => <></>
    },
    //Role.Teacher Views
    {
        path: '/library',
        exact: true,
        title: 'Library',
        type: 'MenuLink',
        component: Library,
        permission: [
            Roles.ADMIN,
            Roles.TEACHER,
        ],
    },
    {
        path: '/classes',
        exact: true,
        title: 'Classes',
        type: 'MenuLink',
        component: Classes,
        permission: [
            Roles.ADMIN,
            Roles.TEACHER,
        ],
    },
    {
        path: '/classes/:id_class',
        exact: false,
        title: 'ClassRoom',
        type: 'Tabs',
        component: ClassRoom,
        permission: [
            Roles.ADMIN,
            Roles.TEACHER,
        ],
        children: [
            {
                component: Performance,
                exact: true,
                path: '',
                title: 'Performance',
            },
            {
                component: ListStudents,
                exact: false,
                path: '/students',
                title: 'Students',
            },
            {
                component: ListAssignmentsInClass,
                exact: false,
                path: '/assignments',
                title: 'Assignments',
            },
            {
                component: ListResultInClass,
                exact: false,
                path: '/result',
                title: 'Result',
                // permission: [
                //     Roles.SUPER_ADMIN,
                //     Roles.ADMIN
                // ]
            }
        ]
    },

    {
        path: '/library/folder/:name_folder/:id_folder',
        exact: false,
        title: 'Questions Folder',
        type: 'None',
        component: () => <ListQuestions />,
        permission: [
            Roles.ADMIN,
            Roles.TEACHER,
        ],
    },
    {
        path: '/create-assignment',
        exact: false,
        title: 'Create Assignment',
        type: 'None',
        component: () => <CreateNewAssignment />,
        permission: [
            Roles.ADMIN,
            Roles.TEACHER,
        ],
    },
    {
        path: '/assignment/:id_assignment/edit',
        exact: false,
        title: 'Edit Assignment',
        type: 'None',
        component: () => <CreateNewAssignment />,
        permission: [
            Roles.ADMIN,
            Roles.TEACHER,
        ],
    },
    {
        path: '/grade-assignment',
        exact: false,
        title: 'Grade Assignment',
        type: 'None',
        component: () => <DetailResult />,
        permission: [
            Roles.ADMIN,
            Roles.TEACHER,
        ],
    },
    // Role.Student Views

    {
        path: '/assignment',
        exact: false,
        title: 'Assignment',
        type: 'MenuLink',
        component: () => <StudentAssignment />,
        permission: [
            Roles.STUDENT
        ],
    },
    {
        path: '/result',
        exact: false,
        title: 'Result',
        type: 'MenuLink',
        component: () => <StudentResult />,
        permission: [
            Roles.STUDENT
        ],
    },
    {
        path: '/id_student/take-assignment',
        exact: false,
        title: 'Take An Assignment',
        type: 'None',
        component: () => <DoAssignment />,
        permission: [
            Roles.STUDENT
        ],
    },
    {
        path: '',
        exact: false,
        title: 'Not Found',
        type: 'None',
        component: () => <NotFound />
    },

]
export default PrivateRoutesConfig