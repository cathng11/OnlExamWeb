import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar, Button, Checkbox, Chip, IconButton, TableCell, Tooltip
} from '@mui/material';
import React from 'react';
import { matchPath } from 'react-router';
import { useHistory } from "react-router-dom";

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

    const pageview = { 'Result': 'result', 'Classes': 'classes', 'Assignment': 'assignment' }
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
            history.push(`/idStudent/take-assignment?id=${row.id}`);
        }
        else if (row.status === 'Completed') {

        }

    }
    const Preview = () => {
        preview(row.id)
    }
    if (role === 'Teacher') {
        if (view === 'Student') {
            return (
                <>
                    <TableCell padding="normal">
                        <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.UserID)}
                            checked={isItemSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                        />
                    </TableCell>
                    <TableCell padding="none" align="left">
                        <Avatar alt={row.Username} src={row.Avatar} />
                    </TableCell>
                    <TableCell align="left">{row.UserID}</TableCell>
                    <TableCell align="left">{row.Username}</TableCell>
                    <TableCell align="left">{row.Firstname}</TableCell>
                    <TableCell align="left">{row.Lastname}</TableCell>
                    <TableCell align="left">{row.Email}</TableCell>
                    <TableCell align="left"><Tooltip title="Detail">
                        <div>
                            <IconButton>
                                <ArrowForwardIcon />
                            </IconButton>
                        </div>

                    </Tooltip></TableCell>
                </>

            )
        }
        else if (view === 'Result') {
            return (
                <>
                    <TableCell padding="normal">
                        <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.id)}
                            checked={isItemSelected}
                        // inputProps={{
                        //     'aria-labelledby': labelId,
                        // }}
                        />
                    </TableCell>
                    <TableCell padding="none" align="left">
                        <Avatar alt={row.name} src={row.avatar} />
                    </TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.firstname}</TableCell>
                    <TableCell align="left">{row.lastname}</TableCell>
                    <TableCell align="left">{row.finishedTime}</TableCell>
                    <TableCell align="left"><Chip label={row.status} color={statusColor[row.status]} /></TableCell>
                    <TableCell align="left">{row.correct}/{row.totalAnswers}</TableCell>
                    {row.status === 'Accepted' ? <TableCell align="left">{row.grade}</TableCell>
                        : <TableCell align="left"><Chip label="Pending" color="warning" /></TableCell>}
                    <TableCell align="left">
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
                    <TableCell padding="normal">
                        <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.ExamID)}
                            checked={isItemSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                        />
                    </TableCell>
                    <TableCell align="left">{row.ExamName}</TableCell>
                    <TableCell align="left">{row.TotalQuestions}</TableCell>
                    <TableCell align="left">{row.Duration}</TableCell>
                    <TableCell align="left">{row.TimeBegin}</TableCell>
                    <TableCell align="left">{row.TimeEnd}</TableCell>


                    <TableCell align="left">
                        <Chip label={status} color={statusColor[status]} />
                    </TableCell>
                    <TableCell align="left"><Tooltip title="Detail">
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
                    <TableCell align="left">{row.id}</TableCell>
                    {/* <TableCell align="left">{row.classname}</TableCell> */}
                    <TableCell align="left">{row.subject}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.duration}</TableCell>
                    <TableCell align="left">{row.begin}</TableCell>
                    <TableCell align="left">{row.end}</TableCell>
                    <TableCell align="left">
                        <Chip label={row.status} color={statusColor[row.status]} />
                    </TableCell>
                    <TableCell align="left"><Button color="secondary" onClick={handleSAClick}>{action[row.status]}</Button></TableCell>

                </>
            )
        } else if (view === 'Result') {
            return (
                <>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.finishedTime}</TableCell>
                    <TableCell align="left"><Chip label={row.status} color={statusColor[row.status]} /></TableCell>
                    <TableCell align="left">{row.correct}</TableCell>
                    <TableCell align="left">
                        {row.status === 'Accepted' ? row.grade : <Chip label="Pending" color="warning" />}
                    </TableCell>
                    <TableCell align="left"><Tooltip title="Detail">
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
