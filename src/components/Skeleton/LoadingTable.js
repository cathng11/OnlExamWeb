import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const rows = [0, 1, 2, 3, 4];
function generate(element) {
    return rows.map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    )

}
export default function LoadingTable() {
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{
                width: '100%',
                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                borderRadius: '10px',
            }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Skeleton variant="rectangular" width={'80%'} height={20} /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {generate(
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell><Skeleton variant="circular" width={35} height={35} /></TableCell>
                                    {generate(<TableCell align="right"><Skeleton variant="rectangular" width={'80%'} height={10} /></TableCell>)}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
