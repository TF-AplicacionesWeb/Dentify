import BaseService from "../../../../../shared/services/base.service.js";
import {Patient} from "../model/patient.entity.js";

export class PatientsService extends BaseService {
    constructor() {
        super('http://localhost:3000/patients');
    }

    async getData(){
        const sInstance = new PatientsService();
        const patients = await sInstance.getAll('');
        return patients.map(pData => new Patient(pData));
    }

    async getNames(){
        const sInstance = new PatientsService();
        try {
            const patients = await sInstance.getAll('');

            if (Array.isArray(patients)){
                const only_name = patients.map(patient => patient.first_name);

                return only_name;
            }
            else{
                return {success:false, message: 'No Patients'}
            }

        } catch (error) {
            console.error("Error in the feature:", error);
            return {success: false, message: "fail"};
        }
    }

}