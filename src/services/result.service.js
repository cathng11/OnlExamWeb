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
export default class ResultService {
    constructor() {
        this.domain = "https://onlxam-e.herokuapp.com/api"
    }
    static myInstance = null;
    static getInstance() {
        if (ResultService.myInstance == null) {
            ResultService.myInstance = new ResultService()
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
    async getListForStudent() {
        let url = `results/student`;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())
    }
    async reviewDoneAssignmentForStudent(examID) {
        let url = `results/student/${examID}`;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())
    }
    async getListResult(data) {
        let url = `results/teacher`;
        let method = "POST";
        return await this.request(url, method,data).then(res => res.json())
    }
}