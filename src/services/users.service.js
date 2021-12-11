import CONSTANTS from './../constants/index';
const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + CONSTANTS.TOKEN_TEACHER
}
export default class UsersService {
    constructor() {
        this.domain = "https://mocki.io/v1/1b7537b3-63c3-4b96-a195-d0593d5bf927"
    }
    static myInstance = null;
    static getInstance() {
        if (UsersService.myInstance == null) {
            UsersService.myInstance = new UsersService()
        }
        return this.myInstance
    }
    request(url, method = "POST", data = null) {
        url = this.domain;
        const options = {
            headers,
            method
        }
        if (data) {
            options.body = JSON.stringify({ ...data })
        }
        return fetch(url, options)
    }
    async getListInClass(data) {
        let url = this.domain;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())

    }
}