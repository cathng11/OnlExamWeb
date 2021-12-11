import CONSTANTS from './../constants/index';
const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + CONSTANTS.TOKEN_TEACHER
}
export default class ClassService {
    constructor() {
        this.domain = "https://mocki.io/v1/23ae5186-f51f-4890-aef0-39c57de083f8"
    }
    static myInstance = null;
    static getInstance() {
        if (ClassService.myInstance == null) {
            ClassService.myInstance = new ClassService()
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
    async getList() {
        let url = this.domain;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())

    }
}