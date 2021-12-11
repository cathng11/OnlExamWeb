import CONSTANTS from './../constants/index';
const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + CONSTANTS.TOKEN_TEACHER
}
export default class LibraryService {
    constructor() {
        this.domain = "https://mocki.io/v1/fcbec0bd-1c8d-4dab-af7f-78c774f2ed79"
    }
    static myInstance = null;
    static getInstance() {
        if (LibraryService.myInstance == null) {
            LibraryService.myInstance = new LibraryService()
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