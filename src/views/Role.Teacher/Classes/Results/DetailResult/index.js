import {
    Container, Grid,
    Paper, Box
} from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import LoadingDetailResult from './../../../../../components/Skeleton/LoadingDetailResult'
import ResultService from './../../../../../services/result.service'
import CandidateExamPaper from './CandidateExamPaper'
import CandidateInformation from './CandidateInformation'
import ResultContext from './../../../../../context/ResultContext';

export default function DetailResult() {
    const [result, setResult] = React.useState(null)
    const value = React.useMemo(() => ({ result, setResult }), [result, setResult]);
    const [data, setData] = React.useState(null)
    let location = useLocation();
    let query = new URLSearchParams(location.search)
    let classID = query.get("inClass")
    let examID = query.get("examID")
    let studentID = query.get("studentID")
    React.useEffect(() => {
        let mounted = true;
        if (examID && studentID) {
            let resultService = ResultService.getInstance()
            resultService.getResultOfStudent(studentID, {
                ExamID: examID
            })
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            setData(items.data)
                            setResult({
                                UserID: studentID,
                                ExamID: examID,
                                Mark: items.data.Mark,
                                Feedback: items.data.Feedback,
                                Accept: data.Accept,
                                QMark: null
                            })
                        }
                    }
                })
                .catch((err) => { console.error(err) });
        }
        return () => { mounted = false };//eslint-disable-next-line
    }, [])
    if (!data) {
        return (<LoadingDetailResult />)
    } else
        return (
            <ResultContext.Provider value={value} >

                <Container maxWidth="full" sx={{ mt: 4, mb: 2 }}>
                    <Grid container spacing={5} sx={{ p: 5 }}>
                        <Grid item xs={12} md={3} lg={3} sx={{ position: 'fixed' }}>
                            <Box sx={{
                                p: 4,
                                boxShadow: 'none',
                                borderRight: '1px solid #D5D5D5'
                            }}>
                                <CandidateInformation data={data} studentID={studentID} classID={classID} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} sx={{ height: '600px', }}></Grid>
                        <Grid item xs={12} md={9} lg={9} sx={{ position: 'relative' }}>
                            <Paper sx={{
                                pt: 2, pb: 2, boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                                borderRadius: '20px'
                            }}>
                                <CandidateExamPaper data={data} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </ResultContext.Provider>
        )
}
