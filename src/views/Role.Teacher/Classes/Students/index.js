import { Container } from '@mui/material';
import * as React from 'react';
import LoadingTable from '../../../../components/Skeleton/LoadingTable';
import CustomTable from '../../../../components/Table/CustomTable';
import UsersService from './../../../../services/users.service';
import { matchPath, useHistory } from "react-router-dom";

const headCells = [
    {
        id: 'Avatar',
        label: 'Avatar',
        disablePadding: true,
    },
    {
        id: 'ID',
        label: 'UserID',
        disablePadding: false,
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
        disablePadding: true,
    },

];
export default function ListStudents() {
    let history = useHistory();
    const [data, setData] = React.useState(null)
    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/students`,
        exact: true,
        strict: false
    });
    React.useEffect(() => {
        let mounted = true;
        let usersService = UsersService.getInstance()
        usersService.getListInClass()
            .then(items => {
                if (mounted) {
                    setData(items);
                }
            })
        return () => { mounted = false };
    }, [])
    if (data) {
        return (
            <Container maxWidth="full" sx={{ mt: 2, mb: 2 }}>
                <CustomTable rows={data} headCells={headCells} view={'Student'} role={'Teacher'} />
            </Container>
        )
    }
    else {
        return (
            <Container maxWidth="full" sx={{ mt: 2, mb: 2 }}>
                <LoadingTable />
            </Container>)
    }
}



