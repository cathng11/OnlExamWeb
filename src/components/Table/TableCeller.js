import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar, Button, Checkbox, Chip, IconButton, TableCell, Tooltip
} from '@mui/material';
import React from 'react';
import { matchPath } from 'react-router';
import { useHistory } from "react-router-dom";

export default function TableCeller({view, role, row, setSelectedRow, labelId, isItemSelected,preview}) {
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
    // let { id_class } = useParams();
    // console.log(id)
    const pageview={'Result':'result','Classes':'classes','Assignment':'assignment'}
    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/${pageview[view]}`,
        exact: true,
        strict: false
      });
    function handleClickGrade(){
        history.push(`/grade-assignment?inClass=${match.params.id}&id=${row.id}`);
    }
    function handleSAClick(){
        if(row.status==='Active')
        {
            history.push(`/idStudent/take-assignment?id=${row.id}`);
        }
        else if(row.status==='Completed')
        {

        }
        
    }
    const Preview=()=>{
        preview(row.id)
    }
    if (role === 'Teacher') {
        if (view === 'Classes') {
            return (
                <>
                    <TableCell padding="normal">
                        <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.id)}
                            checked={isItemSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                        />
                    </TableCell>
                    <TableCell padding="none" align="left">
                        <Avatar alt={row.name} src={row.avatar} />
                    </TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.firstname}</TableCell>
                    <TableCell align="left">{row.lastname}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.gender}</TableCell>
                    <TableCell align="left">{row.verified}</TableCell>
                    <TableCell align="left"><Tooltip title="Detail">
                        <IconButton>
                            <ArrowForwardIcon />
                        </IconButton>
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
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
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
                        <IconButton onClick={handleClickGrade}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip></TableCell>
                </>
            )
        }
        else if (view === 'Assignment') {

            return (
                <>
                    <TableCell padding="normal">
                        <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.id)}
                            checked={isItemSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                        />
                    </TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.subject}</TableCell>
                    <TableCell align="left">{row.totalQuiz}</TableCell>
                    <TableCell align="left">{row.createdOn}</TableCell>
                    <TableCell align="left">
                        <Chip label={row.status} color={statusColor[row.status]} />
                    </TableCell>
                    <TableCell align="left"><Tooltip title="Detail">
                        <IconButton onClick={Preview}>
                            <ArrowForwardIcon />
                        </IconButton>
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
                        <IconButton>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Tooltip></TableCell>

                </>
            )
        }
    }

}
