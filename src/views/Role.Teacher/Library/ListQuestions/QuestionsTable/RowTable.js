import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CheckIcon from '@mui/icons-material/Check'
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Checkbox,
    IconButton,
    Collapse,
} from '@mui/material'
export default function RowTable({ handleClickItem, row, isItemSelected, labelId }) {
    // const { row } = props;
    // const [selected, setSelected] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const handleClick = (event, id) => {
        // setSelected(id);
        handleClickItem(id);
        console.log(id)
    };
    return (
        <React.Fragment>
            <TableRow
                sx={{ '& > *': { borderBottom: 'unset' } }}
                hover
                
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.id)}
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                    />
                </TableCell>
                <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                >
                    {row.id}
                </TableCell>
                {/* <TableCell align="right">{row.id}</TableCell> */}
                <TableCell align="left" >{row.question}</TableCell>
                <TableCell align="left">{row.type}</TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
                <TableCell align="left">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => { setOpen(!open) }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Solution
                            </Typography>
                            <Table size="small" aria-label="answer">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Num</TableCell>
                                        <TableCell>Option</TableCell>
                                        <TableCell align="right">Correct</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.solution.map((sol,index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {index}
                                            </TableCell>
                                            <TableCell>{sol.options}</TableCell>
                                            
                                            <TableCell align="right">{sol.answer===1?<CheckIcon fontSize="small"/>:''}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

