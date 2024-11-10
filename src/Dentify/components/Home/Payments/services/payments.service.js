import BaseService from "../../../../../shared/services/base.service.js";
import { Pendingpay } from "../models/pendingpay.entity.js";


export class PaymentsService extends BaseService {
    constructor() {
        super();
    }

    async getDataForAppointments(userId) {
        const appointments = await this.getAll('appointments');
        const patients = await this.getAll('patients');
        const dentists = await this.getAll('dentists');
        const payments = await this.getAll('payments');


        return appointments
            .filter(appointment => appointment.payment_status === false && appointment.user_id === userId)
            .map(appointment => {
                const patient = patients.find(p => p.appointment_id === appointment.id && p.user_id === userId);
                const dentist = dentists.find(d => d.id === appointment.dentist_dni && d.user_id === userId);
                const payment = payments.find(p => p.id === appointment.payment_id && p.user_id === userId);

                return new Pendingpay({
                    id: appointment.id,
                    dni: patient ? patient.id : '',
                    first_name: patient ? patient.first_name : '',
                    last_name: patient ? patient.last_name : '',
                    appointment_date: appointment.appointment_date,
                    time: appointment.appointment_date,
                    duration_minutes: appointment.duration_minutes,
                    reason: appointment.reason,
                    dentist: dentist ? { first_name: dentist.first_name, last_name: dentist.last_name } : { first_name: '', last_name: '' },
                    payment_status: appointment.payment_status,
                    amount: payment ? payment.amount : 0
                });
            });
    }

    async getDataForInvoice(userId) {
        const appointments = await this.getAll('appointments');
        const patients = await this.getAll('patients');
        const dentists = await this.getAll('dentists');
        const payments = await this.getAll('payments');

        return appointments
            .filter(appointment => appointment.payment_status === true && appointment.user_id === userId)
            .map(appointment => {
                const patient = patients.find(p => p.appointment_id === appointment.id && p.user_id === userId);
                const dentist = dentists.find(d => d.id === appointment.dentist_dni && d.user_id === userId);
                const payment = payments.find(p => p.id === appointment.payment_id && p.user_id === userId);

                return new Pendingpay({
                    id: appointment.id,
                    dni: patient ? patient.id : '',
                    first_name: patient ? patient.first_name : '',
                    last_name: patient ? patient.last_name : '',
                    appointment_date: appointment.appointment_date,
                    time: appointment.appointment_date,
                    duration_minutes: appointment.duration_minutes,
                    reason: appointment.reason,
                    dentist: dentist ? { first_name: dentist.first_name, last_name: dentist.last_name } : { first_name: '', last_name: '' },
                    payment_status: appointment.payment_status,
                    amount: payment ? payment.amount : 0
                });
            });
    }


    async getPaymentForAppointment(userId, appointmentId) {
        try {

            const Response = await this.getAll('appointments');

            const filteredResponse = Response.filter(appointment => appointment.payment_status === true && appointment.user_id === userId)

            const appointment = filteredResponse.find(app => app.id === appointmentId);

            if (appointment && appointment.payment_id) {

                const paymentsResponse = await this.getAll('payments');

                const payment = paymentsResponse.find(pay => pay.id === appointment.payment_id);

                return payment || null;
            } else {

                return null;
            }
        } catch (error) {
            console.error('Error fetching payment for appointment:', error);
            throw error;
        }
    }



    async updateAppointmentStatus(appointmentId, data)
    {
        return this.update('appointments', appointmentId, data);
    }
    async createPayment(paymentData) {
        const newPayment = await this.create('payments', paymentData);
        return newPayment.id;
    }

}
