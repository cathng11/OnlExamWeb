
const headers = {
    'Content-Type': 'application/json',
}
function joinURL(baseURL, url) {
    return `${baseURL}/${url}`
}
export default class AuthService {
    constructor() {
        this.domain = "https://onlxam-a.herokuapp.com/api/auth"
    }
    static myInstance = null;
    static getInstance() {
        if (AuthService.myInstance == null) {
            AuthService.myInstance = new AuthService()
        }
        return this.myInstance
    }
    request(url, method = "POST", data = null) {
        let _url = joinURL(this.domain, url);
        const options = {
            headers,
            method
        }
        if (data) {
            options.body = JSON.stringify({ ...data })
        }
        return fetch(_url, options)
    }
    async sendRequest(data, url) {
        let method = "POST";
        return await this.request(url, method, data).then(res => res.json())

    }

}