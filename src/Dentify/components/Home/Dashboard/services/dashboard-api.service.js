import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const DashboardApiService = {
    getInventory(id) {
        return axios.get(`${API_URL}/inventory`)
            .then(response => {
                return response.data.filter(item => item.user_id === id);
            })
            .catch(error => {
                console.error("Error fetching inventory:", error);
                throw error;
            });
    },
    getAppointments(id) {
        return axios.get(`${API_URL}/appointments`)
            .then(response => {

                return response.data.filter(appointment => appointment.user_id === id);
            })
            .catch(error => {
                console.error("Error fetching appointments:", error);
                throw error;
            });
    },
    async getPayments(user_id) {
        try {

            const userAppointments = await this.getAppointments(user_id);
            const paymentIds = userAppointments.map(appointment => appointment.payment_id);
            const paymentsResponse = await axios.get(`${API_URL}/payments`);
            return paymentsResponse.data.filter(payment => paymentIds.includes(payment.id));
        } catch (error) {
            console.error("Error fetching payments:", error);
            throw error;
        }
    }
};
