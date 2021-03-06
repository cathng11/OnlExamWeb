import {
    Box, Table,
    TableBody,
    TableContainer
} from '@mui/material';
import React from 'react';
import HeadTable from './HeadTable';
import RowTable from './RowTable';
import ToolbarTable from './ToolbarTable';
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
export default function MainTable({ rows, headCells,refresh }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.QuestionID);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const isSelected = (id) => selected.indexOf(id) !== -1;
    const handleClickItem = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <ToolbarTable numSelected={selected.length} selected={selected} refresh={() => refresh()}/>
            <TableContainer
                sx={{ maxHeight: '65vh' }}
            >
                <Table stickyHeader aria-label="sticky collapsible table">

                    <caption >Total questions: {rows.length}</caption>
                    <HeadTable
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        headCells={headCells}
                    />
                    <TableBody>
                        {rows.slice().sort(getComparator(order, orderBy))
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.QuestionID);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <RowTable
                                        key={row.QuestionID}
                                        row={row}
                                        isItemSelected={isItemSelected}
                                        labelId={labelId}
                                        handleClickItem={handleClickItem}
                                    />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
