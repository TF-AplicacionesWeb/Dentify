import BaseService from "../../../../../shared/services/base.service.js";
import {Schedule} from "../model/Schedule.entity.js";

export class ScheduleApiService extends BaseService {
    constructor() {
        super('http://localhost:3000/schedule_dentists');
    }

    static async getSchedulesByDentist(dentistId) {
        const serviceInstance = new ScheduleApiService();
        const schedulesData = await serviceInstance.getAll('');
        return schedulesData.map(scheduleData => new Schedule(scheduleData)).filter(scheduleData => Number(scheduleData.dentist_id) === Number(dentistId));
    }

    static async insertSchedule(newSchedule) {
        const serviceInstance = new ScheduleApiService();
        const schedule = await serviceInstance.create('', newSchedule);
    }

    static async deleteSchedule(id) {
        const serviceInstance = new ScheduleApiService();
        const schedule = await serviceInstance.delete('', id);
    }
}