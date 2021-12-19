import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar, Button, Checkbox, Chip, IconButton, TableCell, Tooltip
} from '@mui/material';
import React from 'react';
import { matchPath, useHistory, useLocation } from 'react-router';
import MemberClassDialog from '../Dialog/MemberClassDialog';
import PreviewDialog from './../Dialog/PreviewDialog';
import ResultDialog from './../Dialog/ResultDialog';
import LoadingAlert from './../Loading/LoadingAlert';

export default function TableCeller({ view, role, row, setSelectedRow, labelId, isItemSelected }) {

    let location = useLocation();
    let history = useHistory();
    const page = {
        'Result': 'result',
        'Classes': 'classes',
        'Assignment': 'assignment',
        'Student': 'students'
    }
    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/${page[view]}`,
        exact: true,
        strict: false
    });
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    const statusColor = {
        "Hidden": "secondary",
        "Completed": "primary",
        "Active": "success",
        "Inactive": "error",
        "Pending": "#EBE645",
        "Accepted": "success",
        "Not Accept": "error",
        "true": "success",
        "false": "error"
    }
    const action = {
        "Hidden": "",
        "Completed": "View",
        "Active": "Take",
        "Inactive": "Not Allow"
    }
    const handleClick = (event, id) => {
        setSelectedRow(event, id);
    };


    function handleClickGrade() {
        let query = new URLSearchParams(location.search)
        if (row.DoingTime) {
            history.push(`/grade-assignment?inClass=${match.params.id}&examID=${query.get("examID")}&studentID=${row.UserID}`);
        }
        else {
            setState(s => { return { ...s, alert: true, title: 'Not show details because student did not turn in!' } })
        }
    }
    const [openPreviewAssignment, setOpenPreviewAssignment] = React.useState(false)

    const handlePreview = () => {
        history.push(`${history.location.pathname}?previewExamID=${row.ExamID}`);
        setOpenPreviewAssignment(true)
    }
    const [openMemberDetail, setOpenMemberDetail] = React.useState(false)
    function handleMemberDetail() {
        history.push(`${history.location.pathname}?memberInfoID=${row.UserID}`);
        setOpenMemberDetail(true)
    }
    const handleClose = () => {
        history.push(`${history.location.pathname}`);
        setOpenMemberDetail(false)
        setOpenPreviewAssignment(false)
        setOpenResultDialog(false)
    }

    const handleStudentActionClick = (status) => {
        let query = new URLSearchParams(location.search)
        let classID = query.get("inClass")
        if (status === 'Active') {
            history.push(`/student1/take-assignment?inClass=${classID}&examID=${row.ExamID}`);

        } else if (status === 'Completed') {
            history.push(`${history.location.pathname}?previewExamID=${row.ExamID}`);
            setOpenPreviewAssignment(true)
        }
        else if (status === 'Inactive') {
            setState(s => { return { ...s, alert: true, title: 'It is not valid time to take!' } })
        }
    }
    const [openResultDialog, setOpenResultDialog] = React.useState(false)

    const handleStudentDetailResult = () => {
        history.push(`${history.location.pathname}?inClass=${row.ClassID}&examID=${row.ExamID}`);
        setOpenResultDialog(true)
    }
    function handleStatus(TimeBegin, TimeEnd) {
        let timeBegin = new Date(TimeBegin)
        let timeEnd = new Date(TimeEnd)
        let today = new Date()
        let status = '';
        if (timeEnd < today) status = 'Completed'
        else if (timeEnd > today) status = 'Active'
        else if (today < timeBegin) status = 'Inactive'
        return status
    }
    if (role === 'Teacher') {
        if (view === 'Student') {
            return (
                <>
                    <TableCell padding="normal" component={'div'}>
                        <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.UserID)}
                            checked={isItemSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                        />
                    </TableCell>
                    <TableCell padding="none" align="left" component={'div'}>
                        <Avatar alt={row.Username} src={row.Avatar} />
                    </TableCell>
                    <TableCell align="left" component={'div'}>{row.Username}</TableCell>
                    <TableCell align="left" component={'div'}>{row.Firstname}</TableCell>
                    <TableCell align="left" component={'div'}>{row.Lastname}</TableCell>
                    <TableCell align="left" component={'div'}>{row.Email}</TableCell>
                    <TableCell align="left" component={'div'}>
                        <Tooltip title="Detail" onClick={handleMemberDetail} >
                            <div>
                                <IconButton>
                                    <ArrowForwardIcon />
                                </IconButton>
                            </div>
                        </Tooltip>
                    </TableCell>
                    <MemberClassDialog data={row} open={openMemberDetail} close={handleClose} classID={match.params.id} />
                </>

            )
        }
        else if (view === 'Result') {
            return (
                <>
                    <TableCell align="left" component={'div'}>{row.UserID}</TableCell>
                    <TableCell align="left" component={'div'}>{row.Firstname + " " + row.Lastname}</TableCell>
                    <TableCell align="center" component={'div'}>{row.DoingTime ? row.DoingTime : 'Not Submit'}</TableCell>
                    {row.Accept ? <TableCell align="left" component={'div'}>{row.Mark}</TableCell> : <TableCell align="left" component={'div'}><Chip label="Pending" sx={{ background: '#EBE645' }} /></TableCell>}
                    <TableCell align="left" component={'div'}>
                        <Chip label={row.Accept ? "Accepted" : "Not Accept"} color={statusColor[row.Accept]} /></TableCell>
                    <TableCell align="left" component={'div'}>
                        <Tooltip title="Grade">
                            <div>
                                <IconButton onClick={handleClickGrade} >
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </Tooltip>
                    </TableCell>
                    <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
                </>
            )
        }
        else if (view === 'Assignment') {
            let status = handleStatus(row.TimeBegin, row.TimeEnd)
            let begin = row.TimeBegin?.replace('T', ' ').replace('.000Z', '').toString()
            let end = row.TimeEnd?.replace('T', ' ').replace('.000Z', '').toString()
            return (
                <>
                    <TableCell padding="normal" component={'div'}>
                        <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.ExamID)}
                            checked={isItemSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                        />
                    </TableCell>
                    <TableCell align="left" component={'div'}>{row.ExamName}</TableCell>
                    <TableCell align="center" component={'div'}>{row.TotalQuestions}</TableCell>
                    <TableCell align="center" component={'div'}>{row.Duration}</TableCell>
                    <TableCell align="left" component={'div'}>{begin}</TableCell>
                    <TableCell align="left" component={'div'}>{end}</TableCell>


                    <TableCell align="left" component={'div'}>
                        <Chip label={status} color={statusColor[status]} />
                    </TableCell>
                    <TableCell align="left" component={'div'}>
                        <Tooltip title="Detail">
                            <div>
                                <IconButton onClick={handlePreview}>
                                    <ArrowForwardIcon />
                                </IconButton>
                            </div>
                        </Tooltip>
                    </TableCell>
                    <PreviewDialog open={openPreviewAssignment} handleClose={handleClose} />
                </>
            )
        }
    }
    if (role === 'Student') {
        if (view === 'Assignment') {
            let status = handleStatus(row.TimeBegin, row.TimeEnd)
            let begin = row.TimeBegin?.replace('T', ' ').replace('.000Z', '').toString()
            let end = row.TimeEnd?.replace('T', ' ').replace('.000Z', '').toString()
            return (
                <>
                    <TableCell align="left" component={'div'}>{row.ExamName}</TableCell>
                    <TableCell align="center" component={'div'}>{row.TotalQuestions}</TableCell>
                    <TableCell align="left" component={'div'}>{row.Duration}</TableCell>
                    <TableCell align="left" component={'div'}>{begin}</TableCell>
                    <TableCell align="left" component={'div'}>{end}</TableCell>
                    <TableCell align="left" component={'div'}>
                        <Chip label={status} color={statusColor[status]} />
                    </TableCell>
                    <TableCell align="left" component={'div'}>
                        <Button
                            color="error"
                            sx={{ fontWeight: 'bold' }}
                            onClick={() => handleStudentActionClick(status)}
                        >
                            {action[status]}
                        </Button>
                    </TableCell>
                    <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
                    <PreviewDialog open={openPreviewAssignment} handleClose={handleClose} />

                </>
            )
        } else if (view === 'Result') {
            return (
                <>
                    <TableCell align="left" component={'div'}>{row.ClassName}</TableCell>
                    <TableCell align="left" component={'div'}>{row.TeacherFullname}</TableCell>
                    <TableCell align="left" component={'div'}>{row.ExamName}</TableCell>
                    <TableCell align="left" component={'div'}>{row.DoingTime}</TableCell>
                    <TableCell align="left" component={'div'}>
                        <Chip label={row.Accept ? "Accepted" : "Not Accept"} color={statusColor[row.Accept]} />
                    </TableCell>
                    <TableCell align="left" component={'div'}>
                        {row.Accept === true ? row.Mark : <Chip label="Pending" sx={{ background: '#EBE645' }} />}
                    </TableCell>
                    <TableCell align="left" component={'div'}>
                        <Tooltip title="Detail">
                            <div>
                                <IconButton onClick={handleStudentDetailResult}>
                                    <ArrowForwardIcon />
                                </IconButton>
                            </div>

                        </Tooltip>
                    </TableCell>
                    <ResultDialog open={openResultDialog} close={handleClose} data={row} />
                </>
            )
        }
    }

}
