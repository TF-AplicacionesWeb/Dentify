import BaseService from "../../../../../shared/services/base.service.js";
import {Patient} from "../model/patient.entity.js";

export class PatientsService extends BaseService {
    constructor() {
        super('http://localhost:3000/');
    }

    async getData(user_id){
        const sInstance = new PatientsService();

        try {

            const patients = await sInstance.getAll('patients');

            const filteredPatients = patients.filter(pData => pData.user_id === user_id);

            return filteredPatients.map(pData => new Patient(pData));
        } catch (error) {
            console.error("Error fetching patient data:", error);
            throw new Error("Could not fetch patient data");
        }
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

}