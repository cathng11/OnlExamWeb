import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow
} from '@mui/material';
import React from 'react';
import TableCeller from './TableCeller';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';

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

export default function CustomTable({ rows, view, headCells, role, refresh }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {

            const newSelecteds = rows.map((n) => {
                let id = -1;
                if (view === 'Assignment') id = n.ExamID
                else if (view === 'Student') id = n.UserID
                else if (view === 'Result') id = n.id
                return id
            });
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const setSelectedRow = (event, id) => {
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
        setSelected(newSelected);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{
                width: '100%', mb: 2,
                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                borderRadius: '10px',
            }}>
                {role === 'Student' ? <></> :
                    <TableToolbar numSelected={selected.length} view={view} role={role} selected={selected} refresh={() => refresh()} />}
                <TableContainer component={'div'}>
                    <Table
                        // sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        component={'div'}
                    >
                        <TableHeader
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                            role={role}
                            component={'div'}
                        />
                        <TableBody component={'div'}>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(getComparator(order, orderBy))
                                .map((row, index) => {
                                    let id = -1;
                                    if (role === 'Teacher') {
                                        if (view === 'Assignment') id = row.ExamID
                                        else if (view === 'Student') id = row.UserID
                                        else if (view === 'Result') id = row.id
                                    } else {
                                        id = row.id
                                    }

                                    const isItemSelected = isSelected(id);

                                    const labelId = `enhanced-table-checkbox-${id}`;

                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={id}
                                            selected={isItemSelected}
                                            component={'div'}
                                        >

                                            <TableCeller
                                                key={id}
                                                isItemSelected={isItemSelected}
                                                labelId={labelId}
                                                row={row}
                                                view={view}
                                                role={role}
                                                // selectedRow={selected}
                                                setSelectedRow={setSelectedRow}
                                            />

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    component="div"
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} component="div" />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}