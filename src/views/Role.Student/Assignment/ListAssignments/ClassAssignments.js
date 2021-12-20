import React from 'react'
import {Box} from '@mui/material'
import CustomTable from '../../../../components/Table/CustomTable';
import { ListAssignmentsForStudent } from '../../../../data/HeadCells';

export default function ClassAssignments({data}) {
    return (
        <Box >
            <CustomTable rows={data} headCells={ListAssignmentsForStudent} view={'Assignment'} role={'Student'} />
        </Box>
    )
}
