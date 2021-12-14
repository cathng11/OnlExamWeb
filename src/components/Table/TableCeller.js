import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar, Button, Checkbox, Chip, IconButton, TableCell, Tooltip
} from '@mui/material';
import React from 'react';
import { matchPath } from 'react-router';
import { useHistory } from "react-router-dom";
import MemberClassDialog from '../Dialog/MemberClassDialog';

export default function TableCeller({ view, role, row, setSelectedRow, labelId, isItemSelected, preview }) {
    // const { view, role, row, setSelectedRow, labelId, isItemSelected } = props;
    // const [selected, setSelected] = React.useState(selectedRow);
    const statusColor = {
        "Hidden": "secondary",
        "Completed": "primary",
        "Active": "success",
        "Inactive": "error",
        "Pending": "warning",
        "Accepted": "success",
        "Not Accept": "error",
    }
    const action = {
        "Hidden": "",
        "Completed": "View",
        "Active": "Take",
        "Inactive": "Take"
    }
    const handleClick = (event, id) => {
        setSelectedRow(event, id);
    };
    let history = useHistory();
    const pageview = { 'Result': 'result', 'Classes': 'classes', 'Assignment': 'assignment','Student':'students' }
    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/${pageview[view]}`,
        exact: true,
        strict: false
    });
    function handleClickGrade() {
        history.push(`/grade-assignment?inClass=${match.params.id}&id=${row.id}`);
    }
    function handleSAClick() {
        if (row.status === 'Active') {
            history.push(`/student1/take-assignment?id=${row.id}`);
        }
        else if (row.status === 'Completed') {

        }

    }
    const Preview = () => {
        preview(row.id)
    }
    const [openMemberDetail, setOpenMemberDetail] = React.useState(false)
    function handleMemberDetail() {
        history.push(`${history.location.pathname}?memberInfoID=${row.UserID}`);
        setOpenMemberDetail(true)
    }
    const handleClose = () => {
        history.push(`${history.location.pathname}`);
        setOpenMemberDetail(false)

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
                    {/* <TableCell align="left">{row.UserID}</TableCell> */}
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
                    <MemberClassDialog data={row} open={openMemberDetail} close={handleClose} classID={match.params.id}/>
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
                        // inputProps={{
                        //     'aria-labelledby': labelId,
                        // }}
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
                        </Tooltip></TableCell>
                </>
            )
        }
        else if (view === 'Assignment') {
            let timeBegin = new Date(row.TimeBegin)
            let timeEnd = new Date(row.TimeEnd)
            let today = new Date()
            let status = '';
            if (timeEnd < today) status = 'Completed'
            else if (timeEnd > today) status = 'Active'
            else if (today < timeBegin) status = 'Inactive'
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
                    <TableCell align="center" component={'div'}>{row.TimeBegin}</TableCell>
                    <TableCell align="center" component={'div'}>{row.TimeEnd}</TableCell>


                    <TableCell align="left" component={'div'}>
                        <Chip label={status} color={statusColor[status]} />
                    </TableCell>
                    <TableCell align="left" component={'div'}><Tooltip title="Detail">
                        <div>
                            <IconButton onClick={Preview}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </div>
                    </Tooltip></TableCell>

                </>
            )
        }
    }
    if (role === 'Student') {
        if (view === 'Assignment') {
            return (
                <>
                    <TableCell align="left" component={'div'}>{row.id}</TableCell>
                    {/* <TableCell align="left">{row.classname}</TableCell> */}
                    <TableCell align="left" component={'div'}>{row.subject}</TableCell>
                    <TableCell align="left" component={'div'}>{row.name}</TableCell>
                    <TableCell align="left" component={'div'}>{row.duration}</TableCell>
                    <TableCell align="left" component={'div'}>{row.begin}</TableCell>
                    <TableCell align="left" component={'div'}>{row.end}</TableCell>
                    <TableCell align="left" component={'div'}>
                        <Chip label={row.status} color={statusColor[row.status]} />
                    </TableCell>
                    <TableCell align="left" component={'div'}><Button color="secondary" onClick={handleSAClick}>{action[row.status]}</Button></TableCell>

                </>
            )
        } else if (view === 'Result') {
            return (
                <>
                    <TableCell align="left" component={'div'}>{row.id}</TableCell>
                    <TableCell align="left" component={'div'}>{row.name}</TableCell>
                    <TableCell align="left" component={'div'}>{row.finishedTime}</TableCell>
                    <TableCell align="left" component={'div'}><Chip label={row.status} color={statusColor[row.status]} /></TableCell>
                    <TableCell align="left" component={'div'}>{row.correct}</TableCell>
                    <TableCell align="left" component={'div'}>
                        {row.status === 'Accepted' ? row.grade : <Chip label="Pending" color="warning" />}
                    </TableCell>
                    <TableCell align="left" component={'div'}><Tooltip title="Detail">
                        <div>
                            <IconButton>
                                <ArrowForwardIcon />
                            </IconButton>
                        </div>

                    </Tooltip></TableCell>

                </>
            )
        }
    }

}
