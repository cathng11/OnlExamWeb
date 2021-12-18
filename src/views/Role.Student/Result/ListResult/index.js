import * as React from 'react';
import CustomTable from './../../../../components/Table/CustomTable';
const headCells = [
    {
        id: 'id',
        label: 'ID',
        disablePadding: false,
    },

    {
        id: 'name',
        label: 'Name',
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
        id: 'correct',
        label: 'Correct',
        disablePadding: true,
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

export default function ListResult() {

    return (
        <CustomTable rows={rows} headCells={headCells} view={'Result'} role={'Student'} />
    )
}
