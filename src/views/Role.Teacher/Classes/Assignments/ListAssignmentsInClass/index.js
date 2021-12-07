import { Container } from '@mui/material';
import * as React from 'react';
import { useHistory } from "react-router-dom";
import LoadingTable from '../../../../../components/Skeleton/LoadingTable';
import CustomTable from '../../../../../components/Table/CustomTable';
import data from '../../../../../data/Data_CA.json';

const rows = data
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
    {
        id: 'totalQuiz',
        label: 'Total Quiz',
        disablePadding: false,
    },
    {
        id: 'createdOn',
        label: 'Created On',
        disablePadding: true,
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
export default function ListAssignmentsInClass() {
    // let { id_class } = useParams();
    console.log("stu", useHistory())
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
                <CustomTable rows={rows} headCells={headCells} view={'Assignment'} role={'Teacher'} />
            </Container>
        )
    }

}