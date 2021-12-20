import { Container } from '@mui/material';
import * as React from 'react';
import { matchPath, useHistory } from "react-router-dom";
import LoadingTable from '../../../../components/Skeleton/LoadingTable';
import CustomTable from '../../../../components/Table/CustomTable';
import { ListStudentsForTeacher } from '../../../../data/HeadCells';
import ClassService from './../../../../services/class.service';


export default function ListStudents() {
    let history = useHistory();
    const [refresh, setRefresh]= React.useState(false)
    const [data, setData] = React.useState(null)
    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/students`,
        exact: true,
        strict: false
    });

    React.useEffect(() => {
        let mounted = true;
        let classID=match.params.id
        let classService = ClassService.getInstance()
        classService.getMembersInClass(classID)
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200)
                    {
                        setData(items.data);
                    }
                    else{

                    }
                }
            })
            .catch((err) => {
                console.error(err)
            });
        return () => { mounted = false };//eslint-disable-next-line
    }, [refresh])
    if (data) {
        return (
            <Container maxWidth="full" sx={{ mt: 2, mb: 2 }}>
                <CustomTable rows={data} headCells={ListStudentsForTeacher} view={'Student'} role={'Teacher'} refresh={()=>setRefresh(!refresh)}/>
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



