import React from 'react'
import {Box} from '@mui/material'
import CustomTable from '../../../../components/Table/CustomTable';
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
        id: 'subject',
        label: 'Subject',
        disablePadding: false,
    },
    // {
    //     id: 'totalQuiz',
    //     label: 'Total Quiz',
    //     disablePadding: false,
    // },
    {
        id: 'duration',
        label: 'Duration',
        disablePadding: true,
    },
    {
        id: 'begin',
        label: 'Begin Time',
        disablePadding: true,
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
        disablePadding: true,
    },

];

export default function ClassAssignments({data}) {
    return (
        <Box >
            <CustomTable rows={data} headCells={headCells} view={'Assignment'} role={'Student'} />
        </Box>
    )
}
