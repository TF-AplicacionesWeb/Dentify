import BaseService from "../../../../../shared/services/base.service.js";
import {Patient} from "../model/patient.entity.js";

export class PatientsService extends BaseService {
    constructor() {
        super();
    }

    async getData(user_id){
        const sInstance = new PatientsService();

        try {

            const patients = await sInstance.getAll('patients');
            if (!Array.isArray(patients)) {
                console.warn("Expected 'patients' to be an array, but got:", patients);
                return [];
            }

            const filteredPatients = patients.filter(pData => pData.user_id === user_id);

            return filteredPatients.map(pData => new Patient(pData));
        } catch (error) {
            console.error("Error fetching patient data:", error);
            throw new Error("Could not fetch patient data");
        }
    }

    async getClinicalRecordsByUserId(user_id){
        const serviceInstance = new PatientsService();
        const patients = await serviceInstance.getData(user_id);

        const patientId = patients.map(pData => pData.clinical_record_id);


        const clinicalRecords = await serviceInstance.getAll('clinical_records');

        return clinicalRecords.filter(record => patientId.includes(record.id));

    }
    async getNames(){
        const sInstance = new PatientsService();
        try {
            const patients = await sInstance.getAll('patients');

            if (Array.isArray(patients)){
                return patients.map(patient => patient.first_name);
            }
            else{
                return {success:false, message: 'No Patients'}
            }

        } catch (error) {
            console.error("Error in the feature:", error);
            return {success: false, message: "fail"};
        }
    }


    async addPatient(newPatient) {
        const serviceInstance = new PatientsService();
        const patient = await serviceInstance.create('patients', newPatient);
        return patient;
    }

    async addClinicalRecord(newRecord){
        const serviceInstance = new PatientsService();
        const record = await serviceInstance.create('clinical_records', newRecord);

        return record;
    }

    async deletePatientByUserId(userId, patientId) {
        try {

            const patients = await this.getAll('patients');


            const patientToDelete = patients.find(patient => patient.user_id === userId && patient.id === patientId);


            if (!patientToDelete) {
                throw new Error("Patient not found or is not linked to the user Id");
            }

            await this.delete('patients', patientId);


            return patientToDelete;
        } catch (error) {
            console.error("Error en deletePatientByUserId:", error);
            throw error;
        }
    }


}