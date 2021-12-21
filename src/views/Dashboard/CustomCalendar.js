import { Paper, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import logo from '../../assets/images/cool-background.png'
import '../../styles/Calendar.css'
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    color: theme.palette.text.secondary,
}))
export default function CustomCalendar() {
    const [value, onChange] = useState(new Date())
    return (
        <div>
            <Typography
                mb={2}
                variant="h5"
                component="div"
                sx={{ fontWeight: 'bold' }}
            >
                Calendar
            </Typography>
            <Item
                sx={{
                    backdropFilter: 'blur(50px) ',
                    boxShadow: '11px 13px 19px 4px rgba(55,59,68,0.7)',
                    backgroundImage: `url(${logo})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 200,
                    color: 'white',

                }}
            >
                <Calendar onChange={onChange} value={value} className="react-calendar" />
            </Item>
        </div>
    )
}
