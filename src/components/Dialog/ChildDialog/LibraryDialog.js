import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, Stack, styled, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import LibraryService from '../../../services/library.service';
import LoadingAlert from './../../Loading/LoadingAlert';
const Input = styled('input')({
    display: 'none',
});
const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 36,
    height: 36,
    border: `2px solid ${theme.palette.background.paper}`,
}));
export default function LibraryDialog({ isSave, isEdit, refresh }) {
    const [input, setInput] = useState({
        Avatar: '',
        LibraryFolderName: '',
        Description: ''
    })
    const [state, setState] = useState({
        loading: false,
        alert: false,
        title: ''
    })
    const showErrorMessage = () => {
        setState({ loading: false, alert: true, title: 'Error. Try again!' })
        refresh();
    }
    useEffect(() => {
        let mounted = true;
        let libraryService = LibraryService.getInstance();
        if (!isEdit.value && isSave) {
            setState(s => { return { ...s, loading: true } })
            libraryService.insert(input)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {

                            setState({ loading: false, alert: true, title: 'Inserted new folder!' })
                            refresh();
                        }
                        else {
                            showErrorMessage()
                        }
                    }
                })
                .catch(err => {
                    console.error(err)
                    showErrorMessage()
                })
        }

        if (isEdit.value) {
            setState(s => { return { ...s, loading: true } })
            libraryService.getByID(isEdit.id)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            let item = items.data[0]
                            setInput({
                                Avatar: item.Avatar,
                                LibraryFolderName: item.LibraryFolderName,
                                Description: item.Description
                            })
                            setState(s => { return { ...s, loading: false } })

                        }
                        else {
                            showErrorMessage()
                        }
                    }
                })
                .catch(err => {
                    console.error(err)
                    showErrorMessage()
                })
        }
        if (isSave && isEdit.value) {
            setState(s => { return { ...s, loading: true } })
            libraryService.update(isEdit.id, input)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            setState({ loading: false, alert: true, title: `Updated folder ${isEdit.id}!` })
                            refresh();
                        }
                        else {
                            showErrorMessage()
                        }
                    }
                })
                .catch(err => {
                    console.error(err)
                    showErrorMessage()
                })
        }
        return () => mounted = false;//eslint-disable-next-line
    }, [isSave])
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(s => { return { ...s, [name]: value } })
    }
    return (
        <Box>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ pb: 4 }}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <SmallAvatar alt="Dolphin" src="/static/images/avatar/1.jpg" sx={{ background: '#dbe7fc' }}>
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </SmallAvatar>
                    }>
                    <Avatar
                        sx={{
                            width: '150px',
                            height: '150px'
                        }}
                        alt="Dolphin"
                        src={input?.Avatar ? input.Avatar : 'D'} />
                </Badge>
                <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
            </Stack>
            <TextField
                id="name-text"
                label="Image URL"
                variant="outlined"
                fullWidth={true}
                margin="normal"
                name="Avatar"
                sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                value={input.Avatar}
                onChange={handleChange}
            />
            <TextField
                id="name-text"
                label="Name Folder"
                variant="outlined"
                fullWidth={true}
                margin="normal"
                name="LibraryFolderName"
                sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                value={input.LibraryFolderName}
                onChange={handleChange}
            />
            <TextField
                id="name-text"
                label="Description"
                variant="outlined"
                fullWidth={true}
                margin="normal"
                multiline={true}
                rows={5}
                name="Description"
                sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                value={input.Description}
                onChange={handleChange}
            />
        </Box>
    )
}
