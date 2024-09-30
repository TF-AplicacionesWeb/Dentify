import BaseService from "../../../../../shared/services/base.service.js";
import {Pendingpay} from "../models/pendingpay.entity.js";

export class PaymentsService extends BaseService {
    constructor() {
        super('http://localhost:3000/');
    }
    async getDataForAppointments() {

        const appointments = await this.getAll('appointments');
        const patients = await this.getAll('patients');
        const dentists = await this.getAll('dentists');

        return appointments.map(appointment => {
            const patient = patients.find(p => p.appointment_id === appointment.appointment_id);
            const dentist = dentists.find(d => d.dni === appointment.dentist_dni);

            return new Pendingpay({
                appointment_id: appointment.appointment_id,
                dni: patient ? patient.dni : '',
                name: patient ? { first_name: patient.first_name, last_name: patient.last_name } : { first_name: '', last_name: '' },
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

        return appointments.filter(appointment => appointment.payment_status === true).map(appointment => {
            const patient = patients.find(p => p.appointment_id === appointment.appointment_id);
            const dentist = dentists.find(d => d.dni === appointment.dentist_dni);

            return new Pendingpay({
                appointment_id: appointment.appointment_id,
                dni: patient ? patient.dni : '',
                name: patient ? { first_name: patient.first_name, last_name: patient.last_name } : { first_name: '', last_name: '' },
                appointment_date: appointment.appointment_date,
                time: appointment.appointment_date,
                duration_minutes: appointment.duration_minutes,
                reason: appointment.reason,
                dentist: dentist ? { first_name: dentist.first_name, last_name: dentist.last_name } : { first_name: '', last_name: '' },
                payment_status: appointment.payment_status
            });
        });
    }
    async updateAppointmentStatus(appointmentId, data) {
        return this.update(`appointments/${appointmentId}`, data);
    }
}
