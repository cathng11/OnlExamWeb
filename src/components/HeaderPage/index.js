import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Grid, Input, styled, Typography } from '@mui/material';
import React from 'react';
import ModalDialog from './../Dialog/ModalDialog';
const HeadGridContainer = styled(Grid)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    paddingLeft: '60px',
    paddingRight: '60px',
}));
const SearchBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
}));
export default function HeaderPage({ dialog,refresh }) {
    const [open, setOpen] = React.useState({
        pageName: '', isOpen: false, id: ''
    });
    // const [data, setData] = React.useState(null)
    React.useEffect(() => {
        setOpen({ pageName: dialog.pageName, isOpen: dialog.isOpen, id: dialog.id })
    }, [dialog]);
    function handleClick() {
        setOpen({ pageName: dialog.pageName, isOpen: true, id: '' });
    }
    const handleClose = (value) => {
        setOpen({ pageName: dialog.pageName, isOpen: value, id: '' });
        refresh();
    };

    const titlePage = {
        "Library": "My Library",
        "Assignments": "My Classes Assignments",
        "Classes": "My Classes Information",
        "Result": "My Classes Result",
    }
    return (
        <HeadGridContainer container >
            <Grid item xs={12} lg={6}>
                <Typography color="text.primary" variant="h5"   >
                    {titlePage[dialog.pageName]}
                </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
                <SearchBox
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Input placeholder="Search"
                        // inputProps={'Search'} 
                        sx={{ mr: 5 }} />
                    <Fab size="small" color="primary" aria-label="add" onClick={handleClick}>
                        <AddIcon />
                    </Fab>
                </SearchBox>
                <ModalDialog open={open} handleClose={handleClose} />
            </Grid>
        </HeadGridContainer>
    )
}
