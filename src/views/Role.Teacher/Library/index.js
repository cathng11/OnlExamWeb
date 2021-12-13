import {
    Container,
    CssBaseline,
    Grid, styled
} from '@mui/material';
import React from 'react';
import HeaderPage from '../../../components/HeaderPage';
import Folders from './Folders';
import LibraryService from '../../../services/library.service';
import LoadingFolder from './../../../components/Skeleton/LoadingFolder';
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
export default function Library() {
    const [data, setData] = React.useState(null)
    const [refresh, setRefresh] = React.useState(false)
    const [dialog, setDialog] = React.useState({
        pageName: 'Library',
        isOpen: false,
        id: ''
    });
    const handleEdit = (id) => {
        setDialog({ pageName: 'Library', isOpen: true, id: id })
    }
    React.useEffect(() => {
        let mounted = true;
        let libraryService = LibraryService.getInstance()
        libraryService.getList()
            .then(items => {
                if (mounted) {
                    console.log(items)
                    if (items.status.Code === 200)
                        setData(items.data);
                }
            })
        return () => { mounted = false};
    }, [refresh])

    return (
        <WrapperContainer maxWidth="full" >
            <CssBaseline />
            <HeaderPage dialog={dialog} refresh={() => setRefresh(!refresh)}/>
            <FolderGridContainer container>
                {data ? <Folders edit={handleEdit} data={data} refresh={()=>setRefresh(!refresh)} /> : <LoadingFolder view={'Library'} />}
            </FolderGridContainer>
        </WrapperContainer>
    )
}
