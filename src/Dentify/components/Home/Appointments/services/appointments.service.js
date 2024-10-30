
import BaseService from "../../../../../shared/services/base.service.js";

export class AppointmentsService extends BaseService {
    constructor() {
        super();
    }


    async getAppointmentsByUserId(userId) {
        const appointments = await this.getAll('appointments');

        return appointments.filter(appointment => appointment.user_id === userId);
    }

    async getDentists() {
        return this.getAll('dentists');
    }
    async getPatients() {
        return this.getAll('patients');
    }
    async createAppointment(appointmentData, patientDni) {
        const allDentists = await this.getDentists();
        const dentists = allDentists.filter(dentist => dentist.user_id === appointmentData.user_id);
        const dentistExists = dentists.some(dentist => dentist.id === appointmentData.dentist_dni);

        if (!dentistExists) {
            throw new Error(`Dentist with DNI ${appointmentData.dentist_dni} does not exist for the specified user.`);
        }

        const allPatients = await this.getPatients();
        const patients = allPatients.filter(patient => patient.user_id === appointmentData.user_id); // Filtrar por user_id

        const patientExists = patients.some(patient => patient.id === patientDni); // Aquí se verifica con el DNI

        if (!patientExists) {
            throw new Error(`Patient with DNI ${patientDni} does not exist for the specified user.`);
        }

        //Añade el id de la cita al paciente correspondiente
        await this.update('patients', patientDni ,{ appointment_id: appointmentData.id });

        // Crear la cita
        return this.create('appointments', appointmentData);

    }


}
