import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material';
import data from '../../../../data/Data_StudentGrade.json'
import data_c from '../../../../data/Data_StudentClass.json'
import CustomTable from './../../../../components/Table/CustomTable';
const rows = data
const headCells = [
    {
        id: 'id',
        label: 'ID',
        disablePadding: false,
    },

    {
        id: 'name',
        label: 'Name',
        disablePadding: false,
    },
    {
        id: 'finishedTime',
        label: 'Time spent',
        disablePadding: false,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
    },
    {
        id: 'correct',
        label: 'Correct',
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
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <Box sx={{ p: 0, width: '100%' }}>
                    {children}
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
export default function ListResult() {
    const [value, setValue] = React.useState(0);
    const [sdvalue, setSdvalue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSdChange = (event, newValue) => {
        setSdvalue(newValue);
    };
    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                // sx={{ borderRight: 1, borderColor: 'gray' }}
            >
                {data_c.map((cl, index) => <Tab label={cl.subject + '-' + cl.classname} {...a11yProps(index)} />)}
            </Tabs>

            <TabPanel value={value} index={0} component={'div'} >
                <CustomTable rows={rows} headCells={headCells} view={'Result'} role={'Student'} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box sx={{ borderBottom: 1, borderColor: 'gray' }}>
                    <Tabs value={sdvalue} onChange={handleSdChange} aria-label="basic tabs example">
                        <Tab label=" One" {...a11yProps(7)} />
                        <Tab label=" Two" {...a11yProps(8)} />
                        <Tab label=" Three" {...a11yProps(9)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={7}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={8}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={9}>
                    Item Three
                </TabPanel>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
        </Box>
    )
}
