import React from 'react'
import {
    Grid,
    Typography,
    Box,
    Divider,
    Chip,
    Button
} from '@mui/material'
import MultipleChoice from '../QuizType/MultipleChoice'
import TrueFalse from '../QuizType/TrueFalse'
import ShortAnswer from '../QuizType/ShortAnswer'
import Essay from '../QuizType/Essay'
import SingleChoice from '../QuizType/SingleChoice'
function QuizItem({ data, index }) {
    const type = {
        'Single Choices': <SingleChoice solution={data.solution} />,
        'Multiple Choices': <MultipleChoice solution={data.solution} />,
        'True/False': <TrueFalse solution={data.solution}/>,
        'Short Answer': <ShortAnswer solution={data.solution}/>,
        'Essay': <Essay solution={data.solution}/>
    }

    return (
        <Grid container sx={{ p: 5 }} spacing={2} >
            <Grid container item xs={12}
                columnSpacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            // sx={{width: '100%',background: 'red'}}
            >
                <Grid item xs={11}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
                        Question {index}: {data.question}
                        <Divider />
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Chip label="1/1" color="success" />
                </Grid>
            </Grid>

            <Grid container item xs={12}>
                <Grid item xs={12} md={4} lg={4}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
                        Answer:
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    {type[data.type]}
                </Grid>
            </Grid>
        </Grid>
    )
}
export default function PaperBox({ data }) {
    return (
        <Box>
            {data.map((value, index) => (
                <QuizItem key={index} data={value} index={index} />
            ))}
            <Divider />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 3,
                pb: 3,
            }}>
                <Button
                    color="inherit"
                    sx={{ mr: 1 }}
                >
                    Accept</Button>
                <Button
                    color="inherit"
                    sx={{ mr: 1 }}
                >
                    Next</Button>
            </Box>
        </Box>
    )
}
