import React from 'react'
import { Grid, Container, Typography, Box } from '@mui/material'
import Logo from '../../../../../assets/images/boy_computer.png'
import Steppers from './Steppers'
import { useLocation, useHistory } from "react-router-dom";
import ClassService from './../../../../../services/class.service';
import LibraryService from './../../../../../services/library.service';
import LoadingNewAssignment from './../../../../../components/Skeleton/LoadingNewAssignment';
import AlertBar from './../../../../../components/Alert/AlertBar';
import AssignmentContext from './../../../../../context/AssignmentContext';

export default function CreateNew() {
    const [assign, setAssign] = React.useState({
        ClassID: [],
        LibraryFolderID:'',
        ExamName: '',
        TimeBegin: '',
        TimeEnd: '',
        Duration: 0,
        Questions: [],
        MaxEssay: 0,
        Type:[]
    })
    const value = React.useMemo(() => ({ assign, setAssign }), [assign, setAssign]);

    const [classes, setClasses] = React.useState(null)
    const [library, setLibrary] = React.useState(null)
    const [state, setState] = React.useState({
        alert: false,
        title: ''
    })
    let location = useLocation();
    let history = useHistory();
    let query = new URLSearchParams(location.search)
    let classID = query.get("inClass")
    const handleError = () => {
        setState({ alert: true, title: 'Error. Try again!' })
        history.goBack()
    }
    React.useEffect(() => {
        let mounted = true;

        let classService = ClassService.getInstance()
        classService.getListForTeacher()
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200)
                        setClasses(items.data);
                    else {
                        handleError()
                    }
                }
            })
            .catch((err) => { console.error(err) });
        let libraryService = LibraryService.getInstance()
        libraryService.getList()
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200)
                        setLibrary(items.data);
                    else {
                        handleError()

                    }
                }
            })
            .catch((err) => { console.error(err) });
        return () => { mounted = false };// eslint-disable-next-line
    }, [])
    return (
        <Container maxWidth="full" sx={{ mt: 5, mb: 2, ml: 4, mr: 4 }}>
            <Grid container spacing={1} rowSpacing={{ xs: 25, md: 5, lg: 0 }}>
                <Grid item xs={12} md={12} lg={7} >
                    <Box sx={{
                        height: '80vh'
                    }}>
                        {classes && library ?
                            <AssignmentContext.Provider value={value}>
                                <Steppers
                                    currentClass={classID}
                                    classes={classes}
                                    library={library}
                                />
                            </AssignmentContext.Provider>
                            : <LoadingNewAssignment />}
                    </Box>
                </Grid>
                <Grid container item xs={12} md={12} lg={5} rowSpacing={2}>
                    <Grid item xs={12} sx={{ background: 'white' }}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h5">About Assignment</Typography>
                            <Typography variant="body1">Enter the details about assignment to start new exam</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ background: 'white' }}>
                        <Box sx={{
                            height: '65vh',
                            width: '100%',
                            backgroundImage: `url(${Logo})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                        }}>

                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <AlertBar
                title={state.title}
                openAlert={state.alert}
                closeAlert={() => setState(s => { return { ...s, alert: false } })}
            />
        </Container>
    )
}
