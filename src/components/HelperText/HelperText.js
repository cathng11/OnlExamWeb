import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'

export default function HelperText({ txt, isError }) {
    const [text, setText] = useState("");
    const [color, setColor] = useState("")
    useEffect(() => {
        setText(txt);
        if (isError) {
            setColor('red');
        }
        else {
            setColor('rgba(0, 0, 0, 0.6)');
        }
    }, [txt, isError])
    return (
        <Typography 
        variant="p"
        sx={{
            color: { color },
            fontFamily: "Roboto,Helvetica,Arial,sans-serif",
            fontWeight: '400',
            fontSize: '0.75rem',
            lineHeight: '1.66',
            letterSpacing: '0.03333em',
            textAlign: 'left',
            marginTop: '4px',
            marginRight: '14px',
            marginBottom: '0',
        }}>{text} </Typography>
    )
}
