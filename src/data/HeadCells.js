const ListStudentsForTeacher = [
    {
        id: 'Avatar',
        label: 'Avatar',
        disablePadding: true,
    },

    {
        id: 'Username',
        label: 'Username',
        disablePadding: false,
    },
    {
        id: 'Firstname',
        label: 'FirstName',
        disablePadding: false,
    },
    {
        id: 'Lastname',
        label: 'LastName',
        disablePadding: false,
    },
    {
        id: 'Email',
        label: 'Email',
        disablePadding: false,
    },
    {
        id: 'action',
        label: 'Action',
        disablePadding: false,
    },

];

const ListResultsForTeacher = [
    {
        id: 'userID',
        label: 'UserID',
        disablePadding: false,
    },
    {
        id: 'fullname',
        label: 'Full Name',
        disablePadding: false,
    },
    {
        id: 'finishedTime',
        label: 'Finished Time',
        disablePadding: false,
    },
    {
        id: 'grade',
        label: 'Grade',
        disablePadding: false,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
    },
    {
        id: 'action',
        label: 'Action',
        disablePadding: false,
    },

];
const ListAssignmentsForTeacher = [
    {
        id: 'name',
        label: 'Name',
        disablePadding: false,
    },
    {
        id: 'totalQuiz',
        label: 'Total Quiz',
        disablePadding: true,
    },
    {
        id: 'duration',
        label: 'Duration',
        disablePadding: true,
    },
    {
        id: 'timeBegin',
        label: 'Time Begin',
        disablePadding: false,
    },
    {
        id: 'timeEnd',
        label: 'Time End',
        disablePadding: false,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
    },
    {
        id: 'action',
        label: 'Action',
        disablePadding: false,
    },

];

const ListQuestions = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'question',
        numeric: false,
        disablePadding: false,
        label: 'Question',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'level',
        numeric: false,
        disablePadding: false,
        label: 'Level',
    },
    {
        id: 'solution',
        numeric: false,
        disablePadding: true,
        label: 'Solution',
    },
]
const ListResultsForStudent = [
    {
        id: 'id',
        label: 'ClassName',
        disablePadding: false,
    },

    {
        id: 'name',
        label: 'Teacher',
        disablePadding: false,
    },
    {
        id: 'name1',
        label: 'Exam Name',
        disablePadding: false,
    },
    {
        id: 'finishedTime',
        label: 'Time spent',
        disablePadding: false,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
    },
    {
        id: 'grade',
        label: 'Grade',
        disablePadding: false,
    },
    {
        id: 'action',
        label: 'Action',
        disablePadding: true,
    },

];
const ListAssignmentsForStudent = [
    {
        id: 'exam-name',
        label: 'Exam Name',
        disablePadding: false,
    },
    {
        id: 'total-questions',
        label: 'Questions',
        disablePadding: true    ,
    },
    {
        id: 'duration',
        label: 'Duration',
        disablePadding: true,
    },
    {
        id: 'begin',
        label: 'Begin Time',
        disablePadding: false,
    },
    {
        id: 'end',
        label: 'End time',
        disablePadding: false,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
    },
    {
        id: 'action',
        label: 'Action',
        disablePadding: false,
    },

];
module.exports = {
    ListStudentsForTeacher,
    ListResultsForTeacher,
    ListAssignmentsForTeacher,
    ListQuestions,
    ListResultsForStudent,
    ListAssignmentsForStudent
};