
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
export default class ProfileService {
    constructor() {
        this.domain = "https://onlxam.herokuapp.com/api"
    }
    static myInstance = null;
    static getInstance() {
        if (ProfileService.myInstance == null) {
            ProfileService.myInstance = new ProfileService()
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
    async get() {
        let url = 'profile';
        let method = "GET";
        return await this.request(url, method).then(res => res.json())

    }
    async update(data) {
        let url = 'profile/update';
        let method = "POST";
        return await this.request(url, method, data).then(res => res.json())
    }
    async updatePassword(data) {
        let url = 'profile/password';
        let method = "POST";
        return await this.request(url, method, data).then(res => res.json())
    }
}