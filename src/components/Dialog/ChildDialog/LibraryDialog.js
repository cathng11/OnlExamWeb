import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, Stack, styled, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import React, { useState, useEffect } from 'react';
import LibraryService from '../../../services/library.service';
import AlertBar from './../../Alert/AlertBar';
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
        alert: false,
        title: ''
    })
    useEffect(() => {
        let mounted = true;
        let libraryService = LibraryService.getInstance();
        if (!isEdit.value && isSave) {
            libraryService.insert(input)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {

                            setState({ alert: true, title: 'Inserted new folder!' })
                            refresh();
                        }
                        else {
                            setState({ alert: true, title: 'Error. Try again!' })
                            refresh();
                        }

                        // inputClone.current = input
                        // setUpdated()
                    }
                })
                .catch(err => console.error(err))
        }

        if (isEdit.value) {
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
                        }
                        else {
                            setState({ alert: true, title: 'Error. Try again!' })
                        }
                    }
                })
                .catch(err => console.error(err))
        }
        if (isSave && isEdit.value) {
            libraryService.update(isEdit.id,input)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            setState({ alert: true, title: `Updated folder ${isEdit.id}!` })
                            refresh();
                        }
                        else {
                            setState({ alert: true, title: 'Error. Try again!' })
                            refresh();
                        }
                    }
                })
                .catch(err => console.error(err))
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
                        <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" >
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </SmallAvatar>
                    }
                >
                    <Avatar sx={{ width: '150px', height: '150px' }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </Badge>
                <AlertBar
                    title={state.title}
                    openAlert={state.alert}
                    closeAlert={() => setState(s => { return { ...s, alert: false } })}
                />
            </Stack>
            <TextField
                id="name-text"
                label="Image URL"
                variant="filled"
                fullWidth={true}
                sx={{ pb: 3 }}
                size="small"
                name="Avatar"
                value={input.Avatar}
                onChange={handleChange}
            />
            <TextField
                id="name-text"
                label="Name Folder"
                variant="filled"
                fullWidth={true}
                sx={{ pb: 3 }}
                size="small"
                name="LibraryFolderName"
                value={input.LibraryFolderName}
                onChange={handleChange}
            />
            <TextField
                id="name-text"
                label="Description"
                variant="filled"
                fullWidth={true}
                sx={{ pb: 3, background: 'white' }}
                size="small"
                multiline={true}
                rows={5}
                name="Description"
                value={input.Description}
                onChange={handleChange}
            />
        </Box>
    )
}
