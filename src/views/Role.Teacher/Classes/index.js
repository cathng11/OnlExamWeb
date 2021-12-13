import { Container, CssBaseline, Grid, styled } from '@mui/material';
import React, { memo } from 'react';
import HeaderPage from '../../../components/HeaderPage';
import Folders from './Folders/index';
import ClassService from './../../../services/class.service';
import LoadingFolder from '../../../components/Skeleton/LoadingFolder';

const WrapperContainer = styled(Container)(({ theme }) => ({
    background: 'white',
    marginTop: '50px',
    marginBottom: '20px'
}));
const FolderGridContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
}));
function Classes({ children }) {
    const [data, setData] = React.useState(null)
    const [dialog, setDialog] = React.useState({
        pageName: 'Classes',
        isOpen: false,
        id: ''
    });
    const [refresh, setRefresh] = React.useState(false)
    const handleEdit = (id) => {
        setDialog({ pageName: 'Classes', isOpen: true, id: id })
    }
    React.useEffect(() => {
        let mounted = true;
        let classService = ClassService.getInstance()
        classService.getListForTeacher()
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200)
                        setData(items.data);
                }
            })
            .catch((err) => { console.error(err) });
        return () => { mounted = false};
    }, [refresh])
    return (
        <WrapperContainer maxWidth="full">
            <CssBaseline />
            <HeaderPage dialog={dialog} refresh={() => setRefresh(!refresh)} />
            <FolderGridContainer container >
                {data ? <Folders data={data} view={"Classes"} edit={handleEdit} refresh={() => setRefresh(!refresh)} /> : <LoadingFolder view={'Classes'} />}
            </FolderGridContainer>
            {/* <ClassRoom/> */}
        </ WrapperContainer>

    )
}
export default memo(Classes)
