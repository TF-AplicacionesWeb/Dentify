import BaseService from "../../../../../shared/services/base.service.js";


 export class DashboardApiService extends BaseService {
    constructor() {
        super('http://localhost:3000');
    }

    async getInventory() {
        return await this.getAll('/inventory');
    }

    async getAppointments() {
        return await this.getAll('/appointments');
    }

    async getPayments() {
        return await this.getAll('/payments');
    }
}

