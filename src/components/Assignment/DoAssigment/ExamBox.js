import React from 'react'
import {
    useTheme,
    Typography,
    Paper,
    Button, 
    Box,
    MobileStepper
} from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SingleChoice from './../../Grade/QuizType/SingleChoice';
import MultipleChoice from './../../Grade/QuizType/MultipleChoice';
import TrueFalse from './../../Grade/QuizType/TrueFalse';
import ShortAnswer from './../../Grade/QuizType/ShortAnswer';
import Essay from './../../Grade/QuizType/Essay';
export default function ExamBox({ data, setCurrentProgress }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = data.length;
    const [progress, setProgress] = React.useState(100 / maxSteps);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 100 / maxSteps));
        setCurrentProgress(progress, activeStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress - 100 / maxSteps));
        setCurrentProgress(progress, activeStep);
    };
    const type = {
        'Single Choices': <SingleChoice solution={data[activeStep].solution} />,
        'Multiple Choices': <MultipleChoice solution={data[activeStep].solution} />,
        'True/False': <TrueFalse solution={data[activeStep].solution} />,
        'Short Answer': <ShortAnswer solution={data[activeStep].solution} />,
        'Essay': <Essay solution={data[activeStep].solution} />
    }
    return (
        <Box sx={{ flexGrow: 1, fontSize: '1.25rem' }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    // height: 50,
                    pl: 2,
                    bgcolor: 'background.default',

                }}
            >
                <Typography variant="h6">Q{activeStep + 1}: {data[activeStep].question}</Typography>
            </Paper>
            <Box sx={{ height: '60vh', width: '100%', pl: 5, pt: 2 }}>
                {/* {data[activeStep].type} */}
                {type[data[activeStep].type]}
            </Box>
            <MobileStepper
                variant={"text"}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <>
                        {activeStep === maxSteps - 1 ? <Button>Finish</Button> : <></>}
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    </>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    )
}
