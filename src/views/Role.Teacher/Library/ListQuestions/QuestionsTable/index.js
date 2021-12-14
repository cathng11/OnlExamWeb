import {
    Grid,
    Paper
} from '@mui/material'
import * as React from 'react'
import MainTable from './MainTable'
import LoadingTable from './../../../../../components/Skeleton/LoadingTable';

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
        id: 'level',
        numeric: false,
        disablePadding: false,
        label: 'Level',
    },
    {
        id: 'solution',
        numeric: false,
        disablePadding: true,
        label: 'Solution',
    },
]

export default function QuestionsTable({ data,refresh }) {
    return (
        <Grid item xs={12} md={12} lg={8} sx={{ background: 'white', pr: 2, pb: { xs: 5, md: 2, lg: 0 } }}>
            <Paper sx={{
                width: '100%', overflow: 'hidden', borderRadius: '10px',
                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
            }}>
                {data?<MainTable rows={data} headCells={headCells} refresh={()=>refresh()}/>:<LoadingTable/>}
            </Paper>
        </Grid>
    )
}
