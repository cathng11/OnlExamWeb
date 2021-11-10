import * as React from 'react'
import data from '../../../Data'
import {
    Grid,
    Paper,
} from '@mui/material'
import MainTable from './TableLibrary/MainTable'

const rows = data
const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'question',
        numeric: false,
        disablePadding: false,
        label: 'Question',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'answer',
        numeric: false,
        disablePadding: true,
        label: 'Answer',
    },
]

export default function TableLibrary() {
    return (
        <Grid item xs={12} md={7} lg={7} sx={{ background: 'white' }}>
            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '10px' }}>
                <MainTable rows={rows} headCells={headCells} />
            </Paper>
        </Grid>
    )
}
