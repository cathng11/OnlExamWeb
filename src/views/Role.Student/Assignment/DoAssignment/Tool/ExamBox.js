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
import SingleChoice from '../../../../Role.Teacher/Classes/Results/DetailResult/QuizType/SingleChoice';
import MultipleChoice from '../../../../Role.Teacher/Classes/Results/DetailResult/QuizType/MultipleChoice';
import TrueFalse from '../../../../Role.Teacher/Classes/Results/DetailResult/QuizType/TrueFalse';
import ShortAnswer from '../../../../Role.Teacher/Classes/Results/DetailResult/QuizType/ShortAnswer';
import Essay from '../../../../Role.Teacher/Classes/Results/DetailResult/QuizType/Essay';

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
        <Box sx={{ flexGrow: 1, fontSize: '1.25rem',height: '70vh',display: 'flex',flexDirection: 'column',justifyContent: 'space-between',alignItems: 'flex-start'}}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    // height: 50,
                    p: 5,
                    pb:0,
                    bgcolor: 'background.default',

                }}
            >
                <Typography variant="h6">Q{activeStep + 1}: {data[activeStep].question}</Typography>
            </Paper>
            <Box sx={{ maxHeight:'100%',height:'70%', width: '100%', pl: 5, pt: 2 }}>
                {/* {data[activeStep].type} */}
                {type[data[activeStep].type]}
            </Box>
            <MobileStepper
                variant={"text"}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width:'100%'}}
                nextButton={
                    <Box>
                        {activeStep === maxSteps - 1 ? <Button variant="contained" color="error">Finish</Button> : <></>}
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
                    </Box>
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
