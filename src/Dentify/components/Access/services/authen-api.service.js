
import {User} from "../model/User.entity.js";
import BaseService from "../../../../shared/services/base.service.js";

export class AuthenApiService extends BaseService {
    constructor() {
        super();
    }

    static async getData() {
        const serviceInstance = new AuthenApiService();
        const usersData = await serviceInstance.getAll('users');
        return usersData.map(userdata => new User(userdata));
    }


    static async login(username, password) {
        const serviceInstance = new AuthenApiService();
        try {
            const users = await serviceInstance.getAll('users');
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                return {success: true, user};
            } else {
                return {success: false, message: 'Username or password is incorrect'};
            }

        } catch (error) {
            console.error("Error durante el login:", error);
            return {success: false, message: "authentication fail"};
        }
    }

    static formatDateTime(date) {

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    static async register({username, email, password}){
        const serviceInstance = new AuthenApiService();
        const user_id = Math.floor(Math.random()*10000)

        const dateTime = AuthenApiService.formatDateTime(new Date())
        try{
            const newUser = new User({
                user_id:user_id,
                username: username,
                email: email,
                password: password,
                register_date: dateTime,

                });

            const createdUser = await serviceInstance.create('users', newUser);
            return { success: true, user: new User(createdUser) };


        } catch(error){
            console.error("Error al registrar:", error)
            return {success: false, message: "registration fail"};
        }
    }

}
