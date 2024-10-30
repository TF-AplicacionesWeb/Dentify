import BaseService from '../../../../../shared/services/base.service.js'

class DashboardApiService extends BaseService {
    constructor() {
        super();
    }

    async getInventory(userId) {
        try {
            const inventoryData = await this.getAll('/inventory');
            return inventoryData.filter(item => item.user_id === userId);
        } catch (error) {
            console.error("Error fetching inventory:", error);
            throw error;
        }
    }

    async getAppointments(userId) {
        try {
            const appointmentsData = await this.getAll('/appointments');
            return appointmentsData.filter(appointment => appointment.user_id === userId);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            throw error;
        }
    }

    async getPayments(userId) {
        try {
            const userAppointments = await this.getAppointments(userId);
            const paymentIds = userAppointments.map(appointment => appointment.payment_id);
            const paymentsData = await this.getAll('/payments');
            return paymentsData.filter(payment => paymentIds.includes(payment.id));
        } catch (error) {
            console.error("Error fetching payments:", error);
            throw error;
        }
    }
}

export default new DashboardApiService();
