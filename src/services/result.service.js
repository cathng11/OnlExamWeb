import CONSTANTS from './../constants/index';
const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + CONSTANTS.TOKEN_TEACHER
}
export default class ResultService {
    constructor() {
        this.domain = "https://mocki.io/v1/6f482847-9b6c-498d-9124-ff68e29dbaf3"
    }
    static myInstance = null;
    static getInstance() {
        if (ResultService.myInstance == null) {
            ResultService.myInstance = new ResultService()
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
    async getListByAssignment(data) {
        let url = this.domain;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())

    }
}