import { Container } from '@mui/material';
import * as React from 'react';
import LoadingTable from '../../../../../components/Skeleton/LoadingTable';
import CustomTable from '../../../../../components/Table/CustomTable';
import data from '../../../../../data/Data_Grade.json';
const rows = data
const headCells = [
    {
        id: 'avatar',
        label: 'Avatar',
        disablePadding: true,
    },
    {
        id: 'id',
        label: 'User ID',
        disablePadding: false,
    },

    {
        id: 'firstname',
        label: 'First Name',
        disablePadding: false,
    },
    {
        id: 'lastname',
        label: 'Last Name',
        disablePadding: false,
    },
    {
        id: 'finishedTime',
        label: 'Finished Time',
        disablePadding: false,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
    },
    {
        id: 'correct',
        label: 'Correct Ans',
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
export default function ListResultInClass() {
    const [loading, setLoading] = React.useState(false)
    if (loading) {
        return (
            <Container maxWidth="full" sx={{ mt: 2, mb: 2 }}>
                <LoadingTable />
            </Container>)
    }
    else {
        return (
            <Container maxWidth="full" sx={{ mt: 2, mb: 2 }}>
                <CustomTable rows={rows} headCells={headCells} view={'Result'} role={'Teacher'} />
            </Container>
        )
    }
}



