import BaseService from "../../../../../shared/services/base.service.js";
import {Patient} from "../model/patient.entity.js";

export class PatientsService extends BaseService {
    constructor() {
        super('http://localhost:3000/patients');
    }

    async getData(user_id){
        const sInstance = new PatientsService();

        try {

            const patients = await sInstance.getAll();

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