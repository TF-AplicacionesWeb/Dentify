
import {User} from "../../../Access/model/User.entity.js"
import BaseService from "../../../../../shared/services/base.service.js";

export class ProfileApiService extends BaseService{

    constructor() {
        super();
    }

    static async getData() {
        const serviceInstance = new ProfileApiService();
        const profilesData = await serviceInstance.getAll('users');
        return profilesData.map(profiledata => new User(profiledata));
    }

    static async updateProfile(id, updatedProfile) {
        try {
            const serviceInstance = new ProfileApiService();
            return await serviceInstance.update('users', id, updatedProfile);
        } catch (error) {
            console.error("Error updating profile", error);
        }
    }

    async updateCompany(userLogged, updatedProfile) {
        try {
            const serviceInstance = new ProfileApiService();
            return await serviceInstance.update('users', userLogged, updatedProfile);
        } catch (error) {
            console.error("Error updating profile", error);
        }
    }
}