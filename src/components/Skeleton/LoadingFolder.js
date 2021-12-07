import {
    Box, Card, CardActionArea,
    CardActions, CardContent, Divider, Grid, Skeleton
} from '@mui/material'
import React from 'react'
export default function LoadingFolder({ view }) {
    function generate(element) {
        if (view === 'Library') {
            return [0, 1, 2, 3].map((value) =>
                React.cloneElement(element, {
                    key: value,
                }),
            )
        } else {
            return [0, 1, 2, 3, 4, 5, 6, 7].map((value) =>
                React.cloneElement(element, {
                    key: value,
                }),
            )
        }

    }
    const heightCard = view === 'Library' ? 400 : 280;

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            alignContent="center"
        >
            {
                generate(
                    <Grid item xs={12} md={6} lg={3} >
                        <Card sx={{
                            m: 5,
                            height: heightCard,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                            borderRadius: '10px'
                        }}>
                            <CardActionArea sx={{ height: heightCard }} >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-around',
                                        alignItems: 'flex-end',
                                        height: '200px',
                                        p: 2
                                    }}
                                >
                                    <Skeleton variant="rectangular" width={"100%"} height={118} animation="wave"  />
                                </Box>
                                <CardContent>
                                    {view === 'Library' ?
                                        <Box>
                                            <Skeleton animation="wave" height={15} width="80%" />
                                            <Skeleton animation="wave" height={15} width="60%" />
                                            <Skeleton animation="wave" height={15} width="50%" />
                                            <Skeleton animation="wave" height={15} width="40%" />
                                            <Skeleton animation="wave" height={15} width="40%" />
                                        </Box> : <Skeleton animation="wave" height={15} width="60%" />}

                                </CardContent>

                            </CardActionArea>
                            <Divider />
                            <CardActions
                                sx={{
                                    height: 50,
                                    background: 'white',
                                    width: '100%',
                                    borderTop: '1px solid #bdc3c7'
                                }}
                                disableSpacing={true}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'white',
                                    width: '100%'
                                }}>
                                    <Skeleton animation="wave" height={10} width="20%" />
                                    <Skeleton animation="wave" height={10} width="20%" />
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                )}
        </Grid>

    )
}
