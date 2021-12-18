import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar, Button, Checkbox, Chip, IconButton, TableCell, Tooltip
} from '@mui/material';
import React from 'react';
import { matchPath, useHistory, useLocation } from 'react-router';
import MemberClassDialog from '../Dialog/MemberClassDialog';
import AlertBar from './../Alert/AlertBar';
import PreviewDialog from './../Dialog/PreviewDialog';
import ResultDialog from './../Dialog/ResultDialog';

export default function TableCeller({ view, role, row, setSelectedRow, labelId, isItemSelected }) {
    // const { view, role, row, setSelectedRow, labelId, isItemSelected } = props;
    // const [selected, setSelected] = React.useState(selectedRow);
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
        history.push(`/grade-assignment?inClass=${match.params.id}&id=${row.id}`);
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
            console.log('Completed')
        }
        else if (status === 'Inactive') {
            setState({ alert: true, title: 'It is not valid time to take!' })
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
                    <TableCell padding="normal" component={'div'}>
                        <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.id)}
                            checked={isItemSelected}
                        />
                    </TableCell>
                    <TableCell padding="none" align="left" component={'div'}>
                        <Avatar alt={row.name} src={row.avatar} />
                    </TableCell>
                    <TableCell align="left" component={'div'}>{row.id}</TableCell>
                    <TableCell align="left" component={'div'}>{row.firstname}</TableCell>
                    <TableCell align="left" component={'div'}>{row.lastname}</TableCell>
                    <TableCell align="left" component={'div'}>{row.finishedTime}</TableCell>
                    <TableCell align="left" component={'div'}><Chip label={row.status} color={statusColor[row.status]} /></TableCell>
                    <TableCell align="left" component={'div'}>{row.correct}/{row.totalAnswers}</TableCell>
                    {row.status === 'Accepted' ? <TableCell align="left" component={'div'}>{row.grade}</TableCell>
                        : <TableCell align="left" component={'div'}><Chip label="Pending" color="warning" /></TableCell>}
                    <TableCell align="left" component={'div'}>
                        <Tooltip title="Grade">
                            <div>
                                <IconButton onClick={handleClickGrade} >
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </Tooltip>
                    </TableCell>
                </>
            )
        }
        else if (view === 'Assignment') {
            let status = handleStatus(row.TimeBegin, row.TimeEnd)
            let begin = row.TimeBegin.replace('T', ' ').replace('.000Z', '')
            let end = row.TimeEnd.replace('T', ' ').replace('.000Z', '')
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
            let begin = row.TimeBegin.replace('T', ' ').replace('.000Z', '')
            let end = row.TimeEnd.replace('T', ' ').replace('.000Z', '')
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
                    <AlertBar
                        title={state.title}
                        openAlert={state.alert}
                        closeAlert={() => setState(s => { return { ...s, alert: false } })}
                    />
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
