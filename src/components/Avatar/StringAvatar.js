
export default function StringAvatar(name) {
    try {
        return {
            sx: {
                background: 'linear-gradient(to right, #005C97 0%, #363795  51%, #005C97  100%)',
                width: 60,
                height: 60,
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        }
    } catch (error) {
        return {
            sx: {
                background: 'linear-gradient(to right, #005C97 0%, #363795  51%, #005C97  100%)',
                width: 60,
                height: 60,
            },
            children: `${name.split(' ')[0][0]}`,
        }
    }
}
