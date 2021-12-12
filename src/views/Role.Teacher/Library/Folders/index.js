import { Grid } from '@mui/material'
import * as React from 'react'
import FolderItem from '../../../../components/Card/FolderItem'

export default function Folders({ edit, data, isDeleted }) {

    return (
        <Grid
            container
            // spacing={1}
            direction="row"
            justify="space-between"
            alignItems="center"
            alignContent="center"
        >
            {data.map((value, index) => (
                <Grid item xs={12} md={6} lg={3} key={index}>
                    <FolderItem key={value.LibraryFolderID} data={value} edit={edit} isDeleted={()=>isDeleted()} view={'Library'} />
                </Grid>
            ))}
        </Grid>
    )
}
