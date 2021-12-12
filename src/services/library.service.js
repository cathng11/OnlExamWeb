import CONSTANTS from './../constants/index';

function setHeader(TOKEN) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
    };
    return headers
}
function joinURL(baseURL, url) {
    return `${baseURL}/${url}`
}
export default class LibraryService {
    constructor() {
        this.domain = "https://onlxam-q.herokuapp.com/api"
    }
    static myInstance = null;
    static getInstance() {
        if (LibraryService.myInstance == null) {
            LibraryService.myInstance = new LibraryService()
        }
        return this.myInstance
    }
    request(url, method = "POST", data = null) {
        let _url = joinURL(this.domain, url);
        let headers = setHeader(JSON.parse(localStorage.getItem(CONSTANTS.USER_TOKEN)).AccessToken);
        const options = {
            headers,
            method
        }
        if (data) {
            options.body = JSON.stringify({ ...data })
        }
        return fetch(_url, options)
    }
    async getList() {
        let url = 'libraries';
        let method = "GET";
        return await this.request(url, method).then(res => res.json())
    }
    async getByID(id) {
        let url = `libraries/${id}`;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())

    }
    async getQuestionsByLibID(id) {
        let url = `questions/lib/${id}`;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())

    }
    async getQuestionsByID(id) {
        let url = `questions/${id}`;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())
    }
    async insert(data) {
        let url = 'libraries';
        let method = "POST";
        return await this.request(url, method, data).then(res => res.json())

    }
    async update(id, data) {
        let url = `libraries/${id}`;
        let method = "PUT";
        return await this.request(url, method, data).then(res => res.json())

    }
    async delete(id) {
        let url = `libraries/${id}`;
        let method = "DELETE";
        return await this.request(url, method).then(res => res.json())

    }
}