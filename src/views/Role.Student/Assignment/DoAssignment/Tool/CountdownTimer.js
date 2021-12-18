import {
    Box, CircularProgress, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function CircularProgressWithTimer(props) {

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', p: 2,
    }}>
            <CircularProgress
                variant="determinate"
                {...props}
                thickness={3}
                color={props.unit==='seconds'?"error":"primary"}
                size={100}
                sx={{
                    border: '0.5px solid #C9CCD5',
                    borderRadius: '50px',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;'
                }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6" component="div" color="text.secondary">
                    {`${Math.round(props.value / 100 * props.timevalue)}`}
                </Typography>
                <Typography variant="body1" component="div" color="text.secondary">
                    {props.unit}
                </Typography>
            </Box>
        </Box>
    );
}
CircularProgressWithTimer.propTypes = {
    value: PropTypes.number.isRequired,
};
export default function CountdownTimer({ timevalue, unit, activeStep }) {
    const [progress, setProgress] = React.useState(100);
    const isSecond = unit === 'seconds' ? 1 : 60;
    const [preStep, setPreStep] = React.useState(activeStep)
    React.useEffect(() => {
        if (activeStep !== preStep && unit === 'seconds') {
            setProgress(100)
            setPreStep(activeStep)
        }
        const timer = setInterval(() => {
            setProgress((prevProgress) =>
                (prevProgress <= 0 ? 100 : prevProgress - 100 / timevalue));
        }, 1000 * isSecond);
        return () => {
            clearInterval(timer);
        };


    }, [activeStep,isSecond, preStep, timevalue, unit]);
    return (
        <CircularProgressWithTimer unit={unit} value={progress} timevalue={timevalue} />
    )
}
