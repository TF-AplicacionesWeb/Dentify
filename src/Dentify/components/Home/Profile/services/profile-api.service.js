import axios from "axios";
import {Profile} from "../model/Profile.entity.js";
import BaseService from "../../../../../shared/services/base.service.js";

export class ProfileApiService extends BaseService{

    constructor() {
        super('http://localhost:3000/users');
    }

    static async getData() {
        const serviceInstance = new ProfileApiService();
        const profilesData = await serviceInstance.getAll('');
        return profilesData.map(profiledata => new Profile(profiledata));
    }

    static async updateProfile(id, updatedProfile) {
        try {
            const serviceInstance = new ProfileApiService();
            return await serviceInstance.update('', id, updatedProfile);
        } catch (error) {
            console.error("Error updating profile", error);
        }
    }

}