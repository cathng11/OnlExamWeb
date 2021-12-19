import { Divider, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function ResultDialog({ open, data, close }) {
    const handleClose = () => {
        close();
    };
    const content = [
        {
            title: "ClassID",
            text: data.ClassID,
        },
        {
            title: "Class Name",
            text: data.ClassName,
        },
        {
            title: "Teacher",
            text: data.TeacherFullname
        },
        {
            title: "Exam name",
            text: data.ExamName,
        },
        {
            title: "Time Begin",
            text: data.TimeBegin?.replace('T', ' ').replace('.000Z', '').toString(),
        },
        {
            title: "Time End",
            text: data.TimeEnd?.replace('T', ' ').replace('.000Z', '').toString(),
        },
        {
            title: "Limit Time",
            text: data.Duration,
        },
        {
            title: "Total Questions",
            text: data.TotalQuestions,
        },
        {
            title: "Time Submit",
            text: data.TimeSubmit?.replace('T', ' ').replace('.000Z', '').toString(),
        },
        {
            title: "Finished Time",
            text: data.DoingTime?.toString(),
        },
        {
            title: "Mark",
            text: data.Accept ? data.Mark : "Pending",
        },
        {
            title: "Status",
            text: data.Accept ? "Accepted" : "Not Accept",
        },

    ]
    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
                <DialogTitle align="center">Assignment Result</DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={4}>
                        {content.map((item, index) => {
                            return (
                                <Grid container item xs={12} key={index}>
                                    <Grid item xs={6} sx={{pl:5}}>
                                        <Typography variant="h6" >
                                            {item.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" color="primary">
                                            {item.text}
                                        </Typography>

                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
