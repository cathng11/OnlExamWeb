import { Paper, styled } from '@mui/material'
import React from 'react'
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    color: theme.palette.text.secondary,
}))
export default function UserAvatar({avatar}) {
    return (
        <div>
            <Item
                sx={{
                    mt: 3,
                    height: '45vh',
                    backgroundColor: '#F0F1F5',
                    backdropFilter: 'blur(50px)',
                    backgroundImage: `url(${avatar})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                }}
            ></Item>
        </div>
    )
}
