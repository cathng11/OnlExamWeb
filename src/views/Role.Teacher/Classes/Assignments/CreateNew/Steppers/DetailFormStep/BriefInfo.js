import {
  Autocomplete, Box, FormControl, InputAdornment, InputLabel,
  MenuItem, Paper, Select, TextField, Typography
} from '@mui/material';
import React from 'react';
import AssignmentContext from './../../../../../../../context/AssignmentContext';

export default function BriefInfo({ info }) {
  const { setAssign } = React.useContext(AssignmentContext);

  const listLibraryFolders = info.library;
  const [libraryFolder, setLibraryFolder] = React.useState('')// eslint-disable-next-line
  const className = info.classes.filter((item) => {
    if (item.ClassID === parseInt(info.currentClass)) {
      return item.ClassName
    }
  })
  const currentClass = React.useState({
    ClassID: info.currentClass,
    ClassName: className[0].ClassName
  })
  const classes = info.classes.filter((item) => {
    return item.ClassID !== parseInt(info.currentClass)
  })
  const [input, setInput] = React.useState({
    ExamName: '',
    Duration: 0
  })
  const handleMultipleClasses = (e, value) => {
    setAssign(s => { return { ...s, ClassID: value } })
  }
  const handleLibrary = (e) => {
    setLibraryFolder(e.target.value)
    setAssign(s => { return { ...s, LibraryFolderID: e.target.value } })
  }
  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setInput(s => { return { ...s, [name]: value } })
    setAssign(s => { return { ...s, [name]: value } })
  }
  return (
    <React.Fragment>
      <Paper
        component="div"
        sx={{
          display: 'flex',
          height: '70vh',
          flexDirection: 'column',
          background: '#D6E6F2',
          p: 5,
          overflow: 'auto',
          boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
          borderRadius: '10px'
        }}
      >
        <Typography color="text.primary" variant="h5" component={'div'}>
          Brief Information
        </Typography>
        <TextField
          id="class-id"
          label="Class ID"
          fullWidth={true}
          margin="normal"
          size="small"
          disabled={true}
          focus={'true'}
          value={currentClass.ClassID}
        />
        <TextField
          id="class-name"
          label="Class Name"
          fullWidth={true}
          margin="normal"
          size="small"
          disabled={true}
          focus={'true'}
          notched={"true"}
          value={currentClass.ClassName}
        />
        <TextField
          id="assignment-name"
          label="Assignment Name"
          fullWidth={true}
          margin="normal"
          size="small"
          name="ExamName"
          value={input.ExamName}
          onChange={handleChange}
        />
        <FormControl margin="normal" size="small">
          <InputLabel id="question-folder">Question Folder</InputLabel>
          <Select
            labelId="question-folder"
            id="question-folder"
            value={libraryFolder}
            label="Question Folder"
            onChange={handleLibrary}
          >
            {listLibraryFolders.map((folder, index) => {
              return (<MenuItem key={index} value={folder.LibraryFolderID}>{folder.LibraryFolderName}</MenuItem>)
            })}

          </Select>
        </FormControl>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={classes}
          getOptionLabel={(option) => option.ClassName}
          filterSelectedOptions
          size="small"
          onChange={handleMultipleClasses}
          renderInput={(params) => (
            <TextField {...params} label="Classes" placeholder="Create this assignment to other classes" margin="normal" />
          )}
        />
        <Box
          component={'div'}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Duration"
            id="duration-text"
            margin="normal"
            size="small"
            name="Duration"
            sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
            type='number'
            value={input.Duration}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
              inputProps: {
                max: 100, min: 5
              }
            }}
          />
        </Box>
      </Paper>
    </React.Fragment>
  )
}
