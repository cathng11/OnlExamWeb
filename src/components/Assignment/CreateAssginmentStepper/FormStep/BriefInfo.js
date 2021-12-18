import React from 'react'
import {
  FormControl,
  Typography,
  Box,
  InputAdornment,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import HelperText from '../../../Helper/HelperText'

export default function BriefInfo() {
  return (
    <React.Fragment>
      <Box
        component="div"
        sx={{
          // maxWidth: "55%",
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center',
          background: 'white',
          p: 4,
        }}
      >
        <Typography color="text.primary" variant="h5" sx={{ pb: 3 }} component={'div'}>
          Brief Information
        </Typography>
        <FormControl sx={{ pb: 3 }} size="small">
          <InputLabel id="classname-label">Class name</InputLabel>
          <Select
            labelId="classname-label"
            id="classname-select"
            // value={age}
            label="Classname"

            // onChange={handleChange}
          >
            <MenuItem value={0}>Multiple Choices</MenuItem>
            <MenuItem value={1}>True/False</MenuItem>
            <MenuItem value={1}>Short Answer</MenuItem>
            <MenuItem value={3}>Essay</MenuItem>
          </Select>
          <FormHelperText>
            {<HelperText txt={'*Required'} isError={false} />}
          </FormHelperText>
        </FormControl>

        <FormControl sx={{ pb: 3 }} size="small">
          <InputLabel id="subject-label">Subject</InputLabel>
          <Select
            labelId="subject-label"
            id="subject-select"
            // value={age}
            label="Subject"
            // onChange={handleChange}
          >
            <MenuItem value={0}>Multiple Choices</MenuItem>
            <MenuItem value={1}>True/False</MenuItem>
            <MenuItem value={1}>Short Answer</MenuItem>
            <MenuItem value={3}>Essay</MenuItem>
          </Select>
          <FormHelperText>
            {<HelperText txt={'*Required'} isError={false} />}
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ pb: 3 }} size="small">
          <InputLabel id="subject-label">Question Folder</InputLabel>
          <Select
            labelId="subject-label"
            id="subject-select"
            // value={age}
            label="Question Folder"
            // onChange={handleChange}
          >
            <MenuItem value={0}>Multiple Choices</MenuItem>
            <MenuItem value={1}>True/False</MenuItem>
            <MenuItem value={1}>Short Answer</MenuItem>
            <MenuItem value={3}>Essay</MenuItem>
          </Select>
          <FormHelperText>{<HelperText txt={'*Required'} isError={false} />}</FormHelperText>
        </FormControl>
        <TextField
          id="name-text"
          label="Assignment Name"
          fullWidth={true}
          sx={{ pb: 3 }}
          size="small"
          helperText={<HelperText txt={'*Required'} isError={false} />}
        />
        <Box
          component={'div'}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Duration"
            id="duration-text"
            sx={{ pb: 3, pr: 5, width: '30%' }}
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
            helperText={<HelperText txt={'*Required'} isError={false} />}
          />
          <TextField
            label="Limit/quiz"
            id="duration-text"
            sx={{ pb: 3, width: '30%' }}
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">s</InputAdornment>,
            }}
            helperText={<HelperText txt={' '} isError={false} />}
          />
        </Box>
      </Box>
    </React.Fragment>
  )
}
