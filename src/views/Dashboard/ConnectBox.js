import {
    Box, Button, Typography
} from '@mui/material'
import React from 'react'
import LOGO from '../../assets/images/dolphin2.jpg'
export default function ConnectBox() {
    const Mailto = ({ email, subject = '', body = '', children }) => {
        let params = subject || body ? '?' : '';
        if (subject) params += `subject=${encodeURIComponent(subject)}`;
        if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
        return <a href={`mailto:${email}${params}`} style={{ color: 'white' }}>{children}</a>;
    };
    return (
        <Box sx={{
            pt: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }}>
            <Box>
                <Typography
                    mb={2}
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 'bold', color: '#3D4E81' }}
                >
                    Keep in touch with us to update new features
                </Typography>
                <Button variant="contained" sx={{
                    backgroundImage: 'linear-gradient(to right, #005C97 0%, #363795  51%, #005C97  100%)',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    transition: '0.5s',
                    backgroundSize: '200% auto',
                    color: 'white',
                    boxShadow: '0 0 20px #eee',
                    borderRadius: '20px',
                    display: 'block',
                    '&:hover': {
                        backgroundPosition: 'right center',
                        color: '#fff',
                        textDecoration: 'none',
                    }
                }}>
                    <Mailto
                        email="contact.onlxam@gmail.com"
                        subject="Feedback From User"
                        body="Hello World!">
                        Connect
                    </Mailto>
                </Button>

            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${LOGO})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                }}
            >
                
            </Box>
        </Box>
    )
}
