import {
    Container,
    CssBaseline,
    Grid,
    Paper,
    styled,
    Box
} from '@mui/material';
import React from 'react';
import LoadingClassStudent from './../../../components/Skeleton/LoadingClassStudent';
import LoadingTable from './../../../components/Skeleton/LoadingTable';
import ClassService from './../../../services/class.service';
import TableAssignment from './ListAssignments/ClassAssignments';
import ListClass from './ListAssignments/ListClass';

const ClassPaper = styled(Paper)(({ theme }) => ({
    borderRadius: '20px',
    height: '73vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    background: 'white',
    overflow: 'auto',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
}));
export default function Assignment() {
    const [open, setOpen] = React.useState({
        state: false,
        data: null
    })
    const [listClass, setListClass] = React.useState(null)
    React.useEffect(() => {
        let mounted = true;
        let classService = ClassService.getInstance()
        classService.getListForStudent()
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200)
                        setListClass(items.data);
                }
            })
            .catch((err) => { console.error(err) });
        return () => { mounted = false };
    }, [])
    const handleOpenAssignment = (id, data) => {
        setOpen({
            state: true,
            data: data
        })
    }
    return (
        <Container
            maxWidth="full"
            sx={{
                mt: 8,
                mb: 4,
                fontSize: '0.75rem',
                width: '100%',
            }}
        >
            <CssBaseline />
            <Grid
                container
                item
                rowSpacing={0}
                columnSpacing={4}
                sx={{ pr: 5, pl: 5 }}
            >

                {open.state ?
                    <Grid container item xs={12} lg={12}
                        rowSpacing={{ xs: 4, md: 0, lg: 0 }}
                        columnSpacing={8}>
                        <Grid item xs={12} md={4} lg={4} sx={{ background: 'white' }}>
                            <Box sx={{
                                height: '60vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                background: 'white',
                                overflow: 'auto',
                                borderRight:'1px solid #EAEAEA'
                            }}>
                                {listClass ? <ListClass data={listClass} open={handleOpenAssignment} /> : <LoadingClassStudent />}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            {open.state && open.data ? <TableAssignment data={open.data} /> : <LoadingTable />}
                        </Grid> </Grid>
                    :
                    <Grid item xs={12} lg={12} sx={{
                        background: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ClassPaper
                            sx={{
                                width: '50vw',
                            }}
                        >
                            {listClass ? <ListClass data={listClass} open={handleOpenAssignment} /> : <LoadingClassStudent />}
                        </ClassPaper>
                    </Grid>}


            </Grid>
        </Container >
    )
}
