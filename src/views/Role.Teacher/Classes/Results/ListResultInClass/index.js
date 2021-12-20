import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import { matchPath, useHistory } from "react-router-dom";
import LoadingTable from '../../../../../components/Skeleton/LoadingTable';
import CustomTable from '../../../../../components/Table/CustomTable';
import { ListResultsForTeacher } from '../../../../../data/HeadCells';
import AssignmentService from './../../../../../services/assignment.service';
import ResultService from './../../../../../services/result.service';
import CircularProgress from '@mui/material/CircularProgress';

function TabPanel(props) {
    let history = useHistory();
    const { children, value, index, item, classID, ...other } = props;
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
        let mounted = true;
        if (props.item && value === index) {
            let resultService = ResultService.getInstance()
            resultService.getListResult({
                ClassID: classID,
                ExamID: item.ExamID
            })
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            setData(items.data)
                            history.push(`${history.location.pathname}?examID=${item.ExamID}`)
                        }
                    }
                })
                .catch((err) => { console.error(err) });
        }
        return () => { mounted = false };//eslint-disable-next-line
    }, [value])
    return (
        <div
            style={{ width: '100%', height: '100%' }}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {!data ? <CircularProgress color="primary" /> : <></>}
                {value === index && data && (
                    <Box sx={{ p: 3 }}>
                        <CustomTable key={index} rows={data.Students} headCells={ListResultsForTeacher} view={'Result'} role={'Teacher'} />
                    </Box>
                )}
            </Box>


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

export default function ListResultInClass() {
    let history = useHistory();
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
    let classID = match.params.id
    React.useEffect(() => {
        let mounted = true;
        let assignmentService = AssignmentService.getInstance()
        assignmentService.getListByClassID(classID)
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200) {
                        let list = []
                        items.data.filter(i => {
                            let tspEnd = new Date(i.TimeEnd).getTime();
                            let tspNow = new Date().getTime() + 7 * 3600000;
                            return tspNow > tspEnd
                        }).map(item => list.push({ ExamID: item.ExamID, ExamName: item.ExamName }))
                        setAssignment(list);
                    }
                }
            })
            .catch((err) => { console.error(err) });
        return () => { mounted = false };//eslint-disable-next-line
    }, [])
    if (assignment) {
        return (
            <Container maxWidth="full" sx={{ mt: 2, mb: 2 }}>
                <Box
                    sx={{ flexGrow: 1, display: 'flex', height: '100%' }}

                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', pt: 5, maxWidth: 200 }}
                    >
                        {assignment.map((item, index) => <Tab
                            label={item.ExamName}
                            {...a11yProps(index)}
                            key={index}
                        />)}
                    </Tabs>
                    {assignment.map((item, index) =>
                        <TabPanel value={value} index={index} key={index} component={'div'} item={item} classID={classID}>
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



