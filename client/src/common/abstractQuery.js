import axios from './axios';

class AbstractQuery {
    constructor(assetEndpoint) {
        this.endpoint = assetEndpoint;
    }

    async getAll() {
        return await axios.get(this.endpoint);
    }

    async getById(id) {
        return await axios.get(`${this.endpoint}/${id}`);
    }

    async post(body) {
        return await axios.post(this.endpoint, body);
    }

    async put(id, body) {
        return await axios.put(`${this.endpoint}/${id}`, body);
    }

    async delete(id) {
        return await axios.delete(`${this.endpoint}/${id}`);
    }
}

export default AbstractQuery;