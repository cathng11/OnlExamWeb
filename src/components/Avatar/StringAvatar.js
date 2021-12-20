
export default function StringAvatar(name) {
    try {
        return {
            sx: {
                background: '#A2DBFA',
                width: 60,
                height: 60,
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        }
    } catch (error) {
        return {
            sx: {
                background: '#A2DBFA',
                width: 60,
                height: 60,
            },
            children: `${name.split(' ')[0][0]}`,
        }
    }
}
