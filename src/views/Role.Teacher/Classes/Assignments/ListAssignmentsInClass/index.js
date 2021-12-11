import { Container } from '@mui/material';
import * as React from 'react';
import LoadingTable from '../../../../../components/Skeleton/LoadingTable';
import CustomTable from '../../../../../components/Table/CustomTable';
import { matchPath, useHistory } from "react-router-dom";
import AssignmentService from '../../../../../services/assignment.service';

const headCells = [
    {
        id: 'name',
        label: 'Name',
        disablePadding: false,
    },
    {
        id: 'totalQuiz',
        label: 'Total Quiz',
        disablePadding: false,
    },
    {
        id: 'duration',
        label: 'Duration',
        disablePadding: false,
    },
    {
        id: 'timeBegin',
        label: 'Time Begin',
        disablePadding: true,
    },
    {
        id: 'timeEnd',
        label: 'Time End',
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
    let history = useHistory();
    const [data, setData] = React.useState(null)
    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/assignments`,
        exact: true,
        strict: false
    });
    React.useEffect(() => {
        let mounted = true;
        let assignmentService = AssignmentService.getInstance()
        assignmentService.getList()
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
                <CustomTable rows={data} headCells={headCells} view={'Assignment'} role={'Teacher'} />
            </Container>
        )
    }
    else {
        return (
            <Container maxWidth="full" sx={{ mt: 2, mb: 2 }}>
                <LoadingTable />
            </Container>
        )
    }

}