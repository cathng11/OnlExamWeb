import {
    Container, Grid
} from '@mui/material'
import * as React from 'react'
import FolderItem from '../../../../components/Card/FolderItem'

export default function Folders({ data, view, edit }) {
    return (
        <Container maxWidth="full" sx={{ mt: 3 }}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                alignContent="center"
            >
                {data.map((value, index) => (
                    <Grid item xs={12} md={6} lg={3} key={index} >
                        <FolderItem
                            key={index}
                            data={value}
                            view={view}
                            edit={edit} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )

}
