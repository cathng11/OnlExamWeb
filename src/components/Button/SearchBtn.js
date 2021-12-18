import * as React from 'react';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, OutlinedInput } from '@mui/material';

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    height: 40,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
        width: 320,
        borderColor: '#659999'
    },
    '& fieldset': {
        borderWidth: `1px !important`,
    }
}));
export default function SearchBtn() {
    return <SearchStyle
        placeholder="Search..."
        startAdornment={
            <InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>
        }
    />
}
