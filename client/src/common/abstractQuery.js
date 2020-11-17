import axios from './axios';

class AbstractQuery {
    constructor(assetEndpoint) {
        this.endpoint = assetEndpoint;
    }

    async getAll(prefix = '') {
        let endpoint = this.endpoint;
        if (prefix) {
            endpoint += prefix;
        }
        return await axios.get(endpoint);
    }

    async getById(id) {
        return await axios.get(`${this.endpoint}/${id}`);
    }

    async post(body) {
        return await axios.post(this.endpoint, body);
    }

    async put(id, body) {
        console.log(`sending request ${body}`);
        return await axios.put(`${this.endpoint}/${id}`, body);
    }

    async delete(id) {
        return await axios.delete(`${this.endpoint}/${id}`);
    }
}

export default AbstractQuery;