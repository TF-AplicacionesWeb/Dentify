import axios from 'axios';
const API_URL = 'http://localhost:3000'; // Cambia la URL según la configuración de tu servidor

export const DashboardApiService = {
    getInventory() {
        return axios.get(`${API_URL}/inventory`);
    },
    getAppointments() {

        return axios.get(`${API_URL}/appointments`);
    },
    getPayments() {
        return axios.get(`${API_URL}/payments`);
    }
};
