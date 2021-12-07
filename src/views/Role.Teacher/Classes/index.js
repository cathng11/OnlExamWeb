import { Container, CssBaseline, Grid, styled } from '@mui/material';
import React, { memo } from 'react';
import ClassFolder from '../../../components/Card/ClassFolder';
import HeaderPage from '../../../components/HeaderPage';
import data_class from '../../../data/data_class.json';
// import ClassRoom from '../ClassRoom';

const data = data_class;
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
function Classes({children}) {
    const [loading, setLoading] = React.useState(false)
    const [dialog, setDialog] = React.useState({
        pageName: 'Classes',
        isOpen: false,
        id: ''
    });
    const handleEdit = (id) => {
        setDialog({ pageName: 'Classes', isOpen: true, id: id })
    }
    return (
        <WrapperContainer maxWidth="full">
            <CssBaseline />
            <HeaderPage dialog={dialog} />
            <FolderGridContainer container >
                <ClassFolder title={"Students"} data={data} view={"Classes"} edit={handleEdit} loading={loading}/>
            </FolderGridContainer>
            {/* <ClassRoom/> */}
        </ WrapperContainer>

    )
}
export default memo(Classes)
