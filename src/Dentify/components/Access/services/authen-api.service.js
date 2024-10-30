
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

    static async register({username, email, password}){
        const serviceInstance = new AuthenApiService();
        const user_id = Math.floor(Math.random()*10000)
        try{
            const newUser = new User({
                user_id:user_id,
                username: username,
                email: email,
                password: password

                });

            const createdUser = await serviceInstance.create('users', newUser);
            return { success: true, user: new User(createdUser) };


        } catch(error){
            console.error("Error al registrar:", error)
            return {success: false, message: "registration fail"};
        }
    }

}
