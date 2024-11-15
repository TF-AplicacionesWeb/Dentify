
import BaseService from "../../../../../shared/services/base.service.js";

export class AppointmentsService extends BaseService {
    constructor() {
        super();
    }


    async deleteAppointmentByUserId(userId, appointmentId) {

        const appointments = await this.getAll('appointments');

        console.log(appointments);
        console.log(userId);
        const appointmentToDelete = appointments.find(appointment => appointment.user_id === userId && appointment.id === appointmentId);

        console.log(appointmentToDelete);

        if (!appointmentToDelete) {
            throw new Error("Cita no encontrada o no pertenece a este usuario.");
        }


        await this.delete('appointments', appointmentId);


        return appointmentToDelete;
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
            alert(`Dentist with DNI ${appointmentData.dentist_dni} does not exist for the specified user.`);
            throw new Error(`Dentist with DNI ${appointmentData.dentist_dni} does not exist for the specified user.`);

        }

        const allPatients = await this.getPatients();
        const patients = allPatients.filter(patient => patient.user_id === appointmentData.user_id); // Filtrar por user_id

        const patientExists = patients.some(patient => patient.id === patientDni); // Aquí se verifica con el DNI

        if (!patientExists) {
            alert(`Patient with DNI ${patientDni} does not exist for the specified user.`);
            throw new Error(`Patient with DNI ${patientDni} does not exist for the specified user.`);
        }

        const patientToUpdate = await this.getById('patients', patientDni);

        // Crear la cita
        const AppointmentCreated = await this.create('appointments', appointmentData);

        const dataPatientToUpdate = {
            clinical_record_id: patientToUpdate.clinical_record_id,
            first_name: patientToUpdate.first_name,
            last_name: patientToUpdate.last_name,
            email: patientToUpdate.email,
            age: patientToUpdate.age,
            medical_history: patientToUpdate.medical_history,
            birth_date: patientToUpdate.birth_date,
            appointment_id: AppointmentCreated.id,
            user_id: patientToUpdate.user_id
        }

        //Añade el id de la cita al paciente correspondiente
        await this.update('patients', patientDni ,dataPatientToUpdate);

    }


}
