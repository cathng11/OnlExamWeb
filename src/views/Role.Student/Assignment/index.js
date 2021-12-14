import React from 'react'
import {
    Container,
    CssBaseline,
    Grid,
    Paper,
    styled
} from '@mui/material'
import data_a from '../../../data/Data_StudentAssignment.json'
import TableAssignment from './ListAssignments/ClassAssignments';
import ListClass from './ListAssignments/ListClass';
import ClassService from './../../../services/class.service';
import LoadingClassStudent from './../../../components/Skeleton/LoadingClassStudent';

const ClassPaper = styled(Paper)(({ theme }) => ({
    borderRadius: '20px',
    height: '73vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'auto',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
}));
export default function Assignment() {
    const [open, setOpen] = React.useState(false)
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
    const handleOpenAssignment = (id) => {
        setOpen(true)
    }
    return (
        <Container
            maxWidth="full"
            sx={{
                mt: 6,
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
                
                    {open ?
                        <Grid container item xs={12} lg={12}
                        rowSpacing={{ xs: 4, md: 0, lg: 0 }}
                        columnSpacing={8}>
                            <Grid item xs={12} md={4} lg={4} sx={{ background: 'white' }}>
                            <ClassPaper>
                                {listClass ? <ListClass data={listClass} open={handleOpenAssignment} /> : <LoadingClassStudent />}
                            </ClassPaper>
                        </Grid>
                            <Grid item xs={12}  md={8} lg={8}>
                                <TableAssignment data={data_a} />
                            </Grid> </Grid> :
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
                                mt: 5,
                            }}
                        >
                            {listClass ? <ListClass data={listClass} open={handleOpenAssignment} /> : <LoadingClassStudent />}
                        </ClassPaper>
                        </Grid>}

                
            </Grid>
        </Container >
    )
}
