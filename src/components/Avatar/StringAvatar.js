// import StringToColor from './StringToColor'

export default function StringAvatar(name) {
    try {
        return {
            sx: {
                background: 'linear-gradient( 179.4deg,  rgba(12,20,69,1) -16.9%, rgba(71,30,84,1) 119.9% );',
                // right: '10px',
                width: 60,
                height: 60,
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        }
    } catch (error) {
        return {
            sx: {
                background: 'linear-gradient( 179.4deg,  rgba(12,20,69,1) -16.9%, rgba(71,30,84,1) 119.9% );',
                // right: '10px',
                width: 60,
                height: 60,
            },
            children: `${name.split(' ')[0][0]}`,
        }
    }
}
