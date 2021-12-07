import { Container } from '@mui/material';
import * as React from 'react';
import LoadingTable from '../../../../components/Skeleton/LoadingTable';
import CustomTable from '../../../../components/Table/CustomTable';
import data from '../../../../data/Data_Users.json';

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
        id: 'email',
        label: 'Email',
        disablePadding: false,
    },
    {
        id: 'phone',
        label: 'Phone',
        disablePadding: false,
    },
    {
        id: 'gender',
        label: 'Gender',
        disablePadding: false,
    },
    {
        id: 'verified',
        label: 'Verified',
        disablePadding: true,
    },
    {
        id: 'action',
        label: 'Action',
        disablePadding: true,
    },

];
export default function ListStudents() {
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
                <CustomTable rows={rows} headCells={headCells} view={'Classes'} role={'Teacher'} />
            </Container>
        )
    }
}



