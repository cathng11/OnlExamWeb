import React from 'react'

export default function QuestionOperation() {
    return (
        <Grid
            container
            item
            xs={12}
            md={1}
            lg={1}
            direction="row"
            rowSpacing={2}
            p={{ xs: 5, md: 5, lg: 2 }}
            justifyContent="space-between"
            alignItems="center"
        >
            <Grid item xs={4} lg={12}>
                <Fab size="small" color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Grid>
            <Grid item xs={4} lg={12}>
                <Fab size="small" color="secondary" aria-label="del">
                    <DeleteOutlineIcon />
                </Fab>
            </Grid>
            <Grid item xs={4} lg={12}>
                <Fab size="small" color="inherit" aria-label="edit">
                    <EditIcon />
                </Fab>
            </Grid>
        </Grid>
    )
}
