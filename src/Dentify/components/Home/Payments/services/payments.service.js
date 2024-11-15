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

        // Verificación de que las listas no son nulas ni vacías
        if (!appointments || !Array.isArray(appointments) || appointments.length === 0) {
            console.warn('No appointments data found.');
        }
        if (!patients || !Array.isArray(patients) || patients.length === 0) {
            console.warn('No patients data found.');
        }
        if (!dentists || !Array.isArray(dentists) || dentists.length === 0) {
            console.warn('No dentists data found.');
        }
        if (!payments || !Array.isArray(payments) || payments.length === 0) {
            console.warn('No payments data found.');
        }

        return appointments
            .filter(appointment => appointment.payment_status === false && appointment.user_id === userId)
            .map(appointment => {
                const patient = patients.find(p => p.appointment_id === appointment.id && p.user_id === userId);
                const dentist = dentists.find(d => d.id === appointment.dentist_dni && d.user_id === userId);
                const payment = payments.find(p => p.id === appointment.payment_id && p.user_id === userId);

                // Si no hay pago, asignamos valores predeterminados (null o 0)
                const paymentData = payment || {
                    amount: null,        // Si no hay pago, se asigna null
                    payment_id: null,    // Si no hay pago, se asigna null
                    user_id: userId,     // Asumimos que el user_id es el mismo
                    status: null         // Si no hay pago, el estado es null
                };

                return new Pendingpay({
                    id: appointment.id,
                    dni: patient ? patient.id : null,  // Asigna null si no hay paciente
                    first_name: patient ? patient.first_name : null,  // Asigna null si no hay paciente
                    last_name: patient ? patient.last_name : null,  // Asigna null si no hay paciente
                    appointment_date: appointment.appointment_date,
                    time: appointment.appointment_date,  // Aquí puedes extraer la hora si lo necesitas
                    duration_minutes: appointment.duration_minutes,
                    reason: appointment.reason,
                    dentist: dentist ? { first_name: dentist.first_name, last_name: dentist.last_name } : { first_name: null, last_name: null },  // Asigna null si no hay dentista
                    payment_status: appointment.payment_status,
                    amount: paymentData.amount,   // Si no hay pago, asigna null o 0
                    payment_id: paymentData.payment_id,  // Si no hay pago, asigna null
                    user_id: paymentData.user_id,  // Asignamos el user_id
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



    async updateAppointmentStatus(appointmentId, appData)
    {
        return this.update('appointments', appointmentId, appData);
    }

    async updatePayment(newData, user_id, appointmentId){
       const appointments = await this.getAll('appointments');

        const appointment = appointments.find(a => a.id === appointmentId && a.user_id === user_id);

        if (!appointment) {
            throw new Error(`Appointment with id ${appointmentId} not found or does not belong to user with id ${user_id}`);
        }

        const payment_id = appointment.payment_id;

        const updatedPayment = await this.update('payments', payment_id, newData);

        const dataAppointmentToUpdate = {
            appointment_date: appointment.appointment_date,
            reason: appointment.reason,
            completed: true,
            reminder_sent: true,
            duration_minutes: appointment.duration_minutes,
            payment_id: payment_id,
            payment_status: true,

        }

        await this.update('appointments', appointmentId, dataAppointmentToUpdate);

        return updatedPayment;


    }

}
