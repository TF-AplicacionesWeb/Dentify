import BaseService from '../../../../../shared/services/base.service.js';

export class SupportService extends BaseService {
    constructor() {
        super();
    }

    async AddMessage(newMessage){
        const instance = new SupportService();
        const message = await instance.create('support-message', newMessage);
        alert('Message sent');
        return message;
    }


}