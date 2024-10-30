import axios from "axios";

class BaseService {
    constructor(baseURL = 'http://localhost:3000/') {
        this.client = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async getAll(endpoint) {
        const response = await this.client.get(endpoint);
        return response.data;
    }

    async getById(endpoint, id) {
        const response = await this.client.get(`${endpoint}/${id}`);
        return response.data;
    }

    async create(endpoint, data) {
        const response = await this.client.post(endpoint, data);
        return response.data;
    }

    async update(endpoint, id, data) {
        const response = await this.client.patch(`${endpoint}/${id}`, data);
        return response.data;
    }

    async delete(endpoint, id) {
        await this.client.delete(`${endpoint}/${id}`);
    }
}

export default BaseService;
