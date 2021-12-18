import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useParams } from "react-router-dom";
import LibraryService from '../../../../services/library.service';
import AddQuestion from '../ListQuestions/AddQuestion';
import QuestionsTable from '../ListQuestions/QuestionsTable';
export default function ListQuestions() {
    let { name_folder, id_folder } = useParams();
    const [refresh, setRefresh] = React.useState(false);
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
        let mounted = true;
        let libraryService = LibraryService.getInstance()
        libraryService.getQuestionsByLibID(id_folder)
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200)
                        setData(items.data);
                }
            })
        return () => { mounted = false };
    }, [refresh,id_folder])
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
                    <QuestionsTable data={data} refresh={() => setRefresh(!refresh)} />
                    <AddQuestion isRefresh={() => setRefresh(!refresh)} />
                </Grid>
            </Grid>

        </Container >


    )
}
