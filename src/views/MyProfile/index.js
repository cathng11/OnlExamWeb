import React from 'react';
import LoadingProfile from '../../components/Skeleton/LoadingProfile';
import ProfileService from '../../services/profile.service';
import Profile from './Profile';


export default function MyProfile() {
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
        let mounted = true;
        let profileService = ProfileService.getInstance();
        profileService.get()
            .then(items => {
                if (mounted) {
                    if (items.status.Code===200)
                        setData(items.data[0]);
                    else {

                    }
                }   
            }).catch(err => {console.error(err)})
        return () => mounted = false;
    }, [])
    if (data) {
        return (<Profile data={data} />)

    } else {
        return (<LoadingProfile />)
    }

}
