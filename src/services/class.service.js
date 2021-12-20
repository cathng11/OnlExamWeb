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
export default class ClassService {
    constructor() {
        this.domain = "https://onlxam.herokuapp.com/api"
    }
    static myInstance = null;
    static getInstance() {
        if (ClassService.myInstance == null) {
            ClassService.myInstance = new ClassService()
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
    async getListForTeacher() {
        let url = 'classes/teacher';
        let method = "GET";
        return await this.request(url, method).then(res => res.json())
    }
    async getListForStudent() {
        let url = 'classes/student';
        let method = "GET";
        return await this.request(url, method).then(res => res.json())
    }
    async getClassByID(id) {
        let url = `classes/teacher/${id}`;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())
    }
    async insertClass(data) {
        let url = 'classes';
        let method = "PUT";
        return await this.request(url, method, data).then(res => res.json())
    }
    async updateClass(id, data) {
        let url = `classes/${id}`;
        let method = "PUT";
        return await this.request(url, method, data).then(res => res.json())
    }
    async deleteClass(id) {
        let url = `classes/${id}`;
        let method = "DELETE";
        return await this.request(url, method).then(res => res.json())
    }
    async getMembersInClass(id) {
        let url = `classes/member/${id}`;
        let method = "GET";
        return await this.request(url, method).then(res => res.json())
    }
    async insertMemberInClass(id) {
        let url = `classes/member/${id}`;
        let method = "PUT";
        return await this.request(url, method).then(res => res.json())
    }
    async checkEmailMember(classID, email) {
        let url = `classes/member/${classID}/check`;
        let method = "POST";
        return await this.request(url, method, email).then(res => res.json())
    }
    async insertMembersInClass(classID, listEmail) {
        let url = `classes/member/${classID}`;
        let method = "PUT";
        let data = listEmail
        return await this.request(url, method, data).then(res => res.json())
    }
    async deleteMembersInClass(classID, listID) {
        let url = `classes/member/${classID}`;
        let method = "DELETE";
        let data = listID
        return await this.request(url, method, data).then(res => res.json())
    }
}