import React from 'react'
import {
    Box,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Checkbox,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'

export default function HeadTable(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,headCells } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead >
            <TableRow >
                <TableCell padding="checkbox" sx={{ background: 'white' }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all',
                        }}
                    />
                </TableCell >
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{ background: 'white',fontSize:'1.25rem' }}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
