import { Container } from '@mui/material';
import * as React from 'react';
import LoadingTable from '../../../../../components/Skeleton/LoadingTable';
import CustomTable from '../../../../../components/Table/CustomTable';
import data from '../../../../../data/Data_Grade.json'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AssignmentService from './../../../../../services/assignment.service';
import { matchPath, useHistory } from "react-router-dom";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
const rows = data
const headCells = [
    {
        id: 'avatar',
        label: 'Avatar',
        disablePadding: true,
    },
    {
        id: 'id',
        label: 'User ID',
        disablePadding: false,
    },

    {
        id: 'firstname',
        label: 'First Name',
        disablePadding: false,
    },
    {
        id: 'lastname',
        label: 'Last Name',
        disablePadding: false,
    },
    {
        id: 'finishedTime',
        label: 'Finished Time',
        disablePadding: false,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
    },
    {
        id: 'correct',
        label: 'Correct Ans',
        disablePadding: true,
    },
    {
        id: 'grade',
        label: 'Grade',
        disablePadding: false,
    },
    {
        id: 'action',
        label: 'Action',
        disablePadding: true,
    },

];
export default function ListResultInClass() {
    let history = useHistory();
    const [loading, setLoading] = React.useState(false)
    const [value, setValue] = React.useState(0);
    const [assignment, setAssignment] = React.useState(null)
    const handleChange = (event, newValue) => {
        setValue(newValue);

    };
    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/result`,
        exact: true,
        strict: false
    });
    React.useEffect(() => {
        let mounted = true;
        let assignmentService = AssignmentService.getInstance()
        assignmentService.getList()
            .then(items => {
                if (mounted) {
                    let list = []
                    items.map(item => list.push(item.ExamID))
                    setAssignment(list);
                }
            })
        return () => { mounted = false };
    }, [])
    if (assignment) {
        return (
            <Container maxWidth="full" sx={{ mt: 2, mb: 2 }}>
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
                    
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider',pt:5 }}
                    >
                        {assignment.map((item, index) => <Tab label={item} {...a11yProps(index)} key={index} />)}
                    </Tabs>
                    {assignment.map((item, index) => 
                    <TabPanel value={value} index={index} key={index} component={'div'}>
                        <CustomTable rows={rows} headCells={headCells} view={'Result'} role={'Teacher'} />
                    </TabPanel>)}

                </Box>

            </Container>
        )
    }
    else {
        return (
            <Container maxWidth="full" sx={{ mt: 2, mb: 2 }}>
                <LoadingTable />
            </Container>)
    }
}



