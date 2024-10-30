import {Dentist} from "../model/Dentist.entity.js";
import BaseService from "../../../../../shared/services/base.service.js";

export class DentistApiService extends BaseService{

    constructor() {
        super();
    }

    static async getData(user_id) {
        const serviceInstance = new DentistApiService();
        const dentistsData = await serviceInstance.getAll('dentists');
        const filteredDentists = dentistsData.filter(dentistData => Number(dentistData.user_id) === Number(user_id));
        return filteredDentists.map(dentistData => new Dentist(dentistData));
    }

    static async deleteDentist(id) {
        const serviceInstance = new DentistApiService();
        const dentist = await serviceInstance.delete('dentists', id);
    }

    static async getDentistById(id) {
        const serviceInstance = new DentistApiService();
        const dentist = await serviceInstance.getById('dentists', id);
        return dentist;
    }

    static async insertDentist(newDentist) {
        const serviceInstance = new DentistApiService();
        const dentist = await serviceInstance.create('dentists', newDentist);
    }

    static async updateDentist(id, updatedDentist) {
        const serviceInstance = new DentistApiService();
        await serviceInstance.update('dentists', id, updatedDentist);
    }

}