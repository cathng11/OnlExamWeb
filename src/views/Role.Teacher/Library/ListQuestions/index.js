import React from 'react'
import { Grid, Container, Typography } from '@mui/material'
import { useParams } from "react-router-dom";
import AddQuestion from '../ListQuestions/AddQuestion';
import QuestionsTable from '../ListQuestions/QuestionsTable';
import LibraryService from '../../../../services/library.service';
export default function ListQuestions() {
    let { name_folder, id_folder } = useParams();
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
        let mounted = true;
        let libraryService = LibraryService.getInstance()
        console.log(id_folder)
        libraryService.getQuestionsByLibID(id_folder)
            .then(items => {
                if (mounted) {
                    console.log(items)
                    if (items.status.Code === 200)
                        setData(items.data);
                }
            })
        return () => { mounted = false };
    }, [])
    return (
        <Container maxWidth="full" sx={{ mt: 5, mb: 2 }}>
            <Grid container sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                background: 'white',
                pl: 5, pr: 5

            }}>
                <Grid item xs={12} lg={6} sx={{ pb: 3 }}>
                    <Typography color="text.primary" variant="h5"   >
                        Folder {id_folder} - {name_folder}
                    </Typography>
                </Grid>
                <Grid container columnSpacing={10} >
                    <QuestionsTable data={data} />
                    <AddQuestion />
                </Grid>
            </Grid>

        </Container >


    )
}
