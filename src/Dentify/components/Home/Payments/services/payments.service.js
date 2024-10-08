import BaseService from "../../../../../shared/services/base.service.js";
import { Pendingpay } from "../models/pendingpay.entity.js";

export class PaymentsService extends BaseService {
    constructor() {
        super('http://localhost:3000/');
    }

    async getDataForAppointments() {
        const appointments = await this.getAll('appointments');
        const patients = await this.getAll('patients');
        const dentists = await this.getAll('dentists');


        //poner un
        return appointments.map(appointment => {
            const patient = patients.find(p => p.appointment_id === appointment.id);
            const dentist = dentists.find(d => d.dni === appointment.dentist_dni);

            return new Pendingpay({
                id: appointment.id,
                dni: patient ? patient.dni : '',
                first_name: patient ? patient.first_name : '',
                last_name: patient ? patient.last_name : '',
                name: patient ? patient.name : '',
                appointment_date: appointment.appointment_date,
                time: appointment.appointment_date,
                duration_minutes: appointment.duration_minutes,
                reason: appointment.reason,
                dentist: dentist ? { first_name: dentist.first_name, last_name: dentist.last_name } : { first_name: '', last_name: '' },
                payment_status: appointment.payment_status
            });
        });

    }

    async getDataForInvoice() {
        const appointments = await this.getAll('appointments');
        const patients = await this.getAll('patients');
        const dentists = await this.getAll('dentists');
        const payments = await this.getAll('payments');

        return appointments.filter(appointment => appointment.payment_status === true).map(appointment => {

            const patient = patients.find(p => p.id === appointment.id);
            const dentist = dentists.find(d => d.dni === appointment.dentist_dni);
            const payment = payments.find(p => p.id === appointment.payment_id);

            return new Pendingpay({
                id: appointment.id,
                dni: patient ? patient.dni : '',
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

    async updateAppointmentStatus(appointmentId, data)
    {
        console.log(data);
        return this.update('appointments', appointmentId, data);
    }
}
