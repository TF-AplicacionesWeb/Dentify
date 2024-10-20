import {Dentist} from "../model/Dentist.entity.js";
import BaseService from "../../../../../shared/services/base.service.js";

export class DentistApiService extends BaseService{

    constructor() {
        super('http://localhost:3000/dentists');
    }

    static async getData() {
        const serviceInstance = new DentistApiService();
        const dentistsData = await serviceInstance.getAll('');
        return dentistsData.map(dentistData => new Dentist(dentistData));
    }

    static async deleteDentist(id) {
        const serviceInstance = new DentistApiService();
        const dentist = await serviceInstance.delete('', id);
    }

    static async getDentistById(id) {
        const serviceInstance = new DentistApiService();
        const dentist = await serviceInstance.getById('', id);
        return dentist;
    }

    static async insertDentist(newDentist) {
        const serviceInstance = new DentistApiService();
        const dentist = await serviceInstance.create('', newDentist);
    }

    static async updateDentist(id, updatedDentist) {
        const serviceInstance = new DentistApiService();
        await serviceInstance.update('', id, updatedDentist);
    }

}