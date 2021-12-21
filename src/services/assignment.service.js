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
export default class AssignmentService {
    constructor() {
        this.domain = "https://onlxam.herokuapp.com/api"
    }
    static myInstance = null;
    static getInstance() {
        if (AssignmentService.myInstance == null) {
            AssignmentService.myInstance = new AssignmentService()
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
    async getListByClassID(id) {
        let url = `exams/class/${id}`;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())
    }
    async getDetailAssignment(id) {
        let url = `exams/${id}`;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())
    }
    async createAssignment(data) {
        let url = `exams`;
        let method = "PUT";
        return await this.request(url, method, data).then(res => res.json())
    }
    async deleteAssignment(id, data) {
        let url = `exams/${id}`;
        let method = "DELETE";
        return await this.request(url, method, data).then(res => res.json())
    }
    async updateAssignment(id, data) {
        let url = `exams/${id}`;
        let method = "POST";
        return await this.request(url, method, data).then(res => res.json())
    }
    async getAssignmentToDo(id) {
        let url = `exams/do-exam/${id}`;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())
    }
    async submitAssignment(data) {
        let url = `exams/do-exam/submit`;
        let method = "POST";
        return await this.request(url, method, data).then(res => res.json())
    }
    async getLatestAssignment(data) {
        let url = 'exams/e/dashboard';
        let method = "POST";
        return await this.request(url, method, data).then(res => res.json())
    }
    async getStatics(data) {
        let url = 'exams/t/dashboard';
        let method = "POST";
        return await this.request(url, method, data).then(res => res.json())
    }
}