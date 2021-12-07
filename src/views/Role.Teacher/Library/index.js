import {
    Container,
    CssBaseline,
    Grid, styled
} from '@mui/material';
import React from 'react';
import HeaderPage from '../../../components/HeaderPage';
import Folders from './Folders';
// import APP_CONSTANTS from '../../../constants'
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
// const token=APP_CONSTANTS.TOKEN_TEACHER

export default function Library() {
    // const [list,setList]=React.useState([])
    const [dialog, setDialog] = React.useState({
        pageName: 'Library',
        isOpen: false,
        id: ''
    });
    const [loading, setLoading] = React.useState(false)
    const handleEdit = (id) => {
        setDialog({ pageName: 'Library', isOpen: true, id: id })
    }
    // async function getList(data) {
    //     return fetch('https://onlxam-q.herokuapp.com/api/questions', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization':'Bearer ' + token
    //         },
    //         // body: JSON.stringify({ username: data[0], password: data[1] })
    //     })
    //         .then(data => data.json())
    //         .catch(err =>console.log(err))
    // }
    // React.useEffect(() => {
    //     let mounted = true;
    //     getList()
    //       .then(items => {
    //         if(mounted) {
    //           setList(items);
    //           console.log(items)
    //         }
    //       })
    //     return () => mounted = false;
    //   }, [])
    return (
        <WrapperContainer maxWidth="full" >
            <CssBaseline />
            <HeaderPage dialog={dialog} />
            <FolderGridContainer container>
                <Folders edit={handleEdit} loading={loading} />
            </FolderGridContainer>
        </WrapperContainer>
    )
}
