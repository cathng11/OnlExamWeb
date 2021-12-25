import {
    Timeline, TimelineConnector,
    TimelineContent,
    TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator
} from '@mui/lab'
import { Paper, styled, CircularProgress, Box, Typography } from '@mui/material'
import React from 'react'
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    color: theme.palette.text.secondary,
}))
export default function Summary({ data, label, index }) {
    const [content, setContent] = React.useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    React.useEffect(() => {
        if (data) {
            if (index === 1) {
                let arr = []// eslint-disable-next-line
                data.filter(s => {
                    arr.push({
                        date: s.TimeBegin?.toString().substring(5, 10).replace("-", "/"),
                        name: s.ExamName+' - CL'+s.ClassID,
                    })
                })
                setContent(arr)
            } else if (index === 2) {
                if (user.RoleID === 3) {
                    setContent(
                        [{
                            date: '',
                            name: 'Rank: ' + data.Rank,
                        },
                        {
                            date: '',
                            name: 'GPA: ' + data.GPA,
                        }]
                    )
                } else {
                    let arr = []// eslint-disable-next-line
                    data.filter((s, i) => {// eslint-disable-next-line
                        if (s.UserID > 99) return;
                        else arr.push({
                            date: s.UserID,
                            name: s.Firstname + " " + s.Lastname,
                        })
                    })
                    setContent(arr)
                }
            } else if (index === 3) {
                if (user.RoleID === 3) {
                    setContent(
                        [{
                            date: '',
                            name: 'Done: ' + data.DoneNumber,
                        },
                        {
                            date: '',
                            name: 'Not done: ' + data.NotDoneNumber,
                        }]
                    )
                } else {
                    setContent(
                        [{
                            date: '',
                            name: 'Classes: ' + data.TotalClasses,
                        },
                        {
                            date: '',
                            name: 'Assignments: ' + data.TotalAssignments,
                        },
                        {
                            date: '',
                            name: 'Students: ' + data.TotalStudents,
                        }]
                    )
                }
            }
        }// eslint-disable-next-line
    }, [data])
    return (
        <Item
            sx={{
                height: '25vh',
                width: '100%',
                overflow: 'hidden',
                backdropFilter: 'blur(50px)',
                background: 'radial-gradient( circle farthest-corner at 1.3% 2.8%,  rgba(239,249,249,1) 0%, rgba(182,199,226,1) 100.2% );',
                boxShadow: '11px 13px 19px 4px rgba(55,59,68,0.7)'
            }}
        >
            <Typography variant="body1" color="primary">
                {label}
            </Typography>
            {content ?
                <Timeline align="left" sx={{ p: 0 }}>
                    {content.map((value, index) => (
                        <TimelineItem sx={{ maxHeight: '30%', minHeight: 50 }} key={index}>
                            <TimelineOppositeContent
                                sx={{ flex: 0.1, pl: 0 }}
                            >
                                {value.date}
                            </TimelineOppositeContent>
                            <TimelineSeparator >
                                <TimelineDot sx={{ background: '#380036' }} />
                                {index !== content.length - 1 ? <TimelineConnector sx={{ background: '#3D4E81' }} /> : <></>}
                            </TimelineSeparator>
                            <TimelineContent>{value.name}</TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline> :
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pb: 3
                }}><CircularProgress color="primary" /></Box>
            }
        </Item>
    )
}
