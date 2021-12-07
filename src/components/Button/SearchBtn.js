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
        // boxShadow: theme.customShadows.z8 
        borderColor: '#659999'
    },
    
    '& fieldset': {
        borderWidth: `1px !important`,
        // borderColor: `${theme.palette.grey[500_32]} !important`
    }
}));
export default function SearchBtn() {
    return <SearchStyle
        // value={filterName}
        // onChange={onFilterName}
        placeholder="Search..."
        startAdornment={
            <InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>
        }
    />
}
