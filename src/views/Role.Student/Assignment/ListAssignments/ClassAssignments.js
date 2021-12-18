import React from 'react'
import {Box} from '@mui/material'
import CustomTable from '../../../../components/Table/CustomTable';
const headCells = [
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

export default function ClassAssignments({data}) {
    return (
        <Box >
            <CustomTable rows={data} headCells={headCells} view={'Assignment'} role={'Student'} />
        </Box>
    )
}
