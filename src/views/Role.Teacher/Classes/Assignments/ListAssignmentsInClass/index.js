import { Container } from '@mui/material';
import * as React from 'react';
import LoadingTable from '../../../../../components/Skeleton/LoadingTable';
import CustomTable from '../../../../../components/Table/CustomTable';
import { matchPath, useHistory } from "react-router-dom";
import AssignmentService from '../../../../../services/assignment.service';
import { ListAssignmentsForTeacher } from '../../../../../data/HeadCells';

export default function ListAssignmentsInClass() {
    let history = useHistory();
    const [data, setData] = React.useState(null)
    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/assignments`,
        exact: true,
        strict: false
    });
    const [refresh, setRefresh] = React.useState(false)
    React.useEffect(() => {
        let mounted = true;
        let classID = match.params.id
        let assignmentService = AssignmentService.getInstance()
        assignmentService.getListByClassID(classID)
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200)
                        setData(items.data);
                }
            })
            .catch((err) => { console.error(err) });
        return () => { mounted = false };//eslint-disable-next-line
    }, [refresh])
    if (data) {
        return (
            <Container maxWidth="full" sx={{ mt: 2, mb: 2 }}>
                <CustomTable
                    rows={data}
                    headCells={ListAssignmentsForTeacher}
                    view={'Assignment'}
                    role={'Teacher'}
                    refresh={() => setRefresh(!refresh)} />
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