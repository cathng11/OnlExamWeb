import StringToColor from './StringToColor'

export default function StringAvatar(name) {
    try {
        
        return {
            sx: {
                bgcolor: StringToColor(name),
                // right: '10px',
                width: 60,
                height: 60,
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        }
    } catch (error) {
        return {
            sx: {
                bgcolor: StringToColor(name),
                // right: '10px',
                width: 60,
                height: 60,
            },
            children: `${name.split(' ')[0][0]}`,
        }
    }
}
