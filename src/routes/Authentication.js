import CONSTANTS from './../constants/index';

class Authentication {
    isAuthentication() {
        const token = localStorage.getItem(CONSTANTS.USER_TOKEN)
        return token
    }
}
const authentication = new Authentication()
export {authentication}

