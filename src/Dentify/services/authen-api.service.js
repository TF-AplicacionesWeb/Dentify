import axios from "axios";
import {User} from "../model/User.entity.js";

export class AuthenApiService {


    static getData() {

        return axios.get("http://localhost:3000/users")
            .then((response) => {
            return response.data.map(userdata => new User(userdata));
        });
    }

    static login(username, password) {
        const apiUrl = "http://localhost:3000/users"; // URL de tu fake API


        return axios
            .get(apiUrl)
            .then((response) => {
                const users = response.data;
                const user = users.find((u) => u.username === username && u.password === password);

                if (user) {
                    // Si el usuario es encontrado, login exitoso
                    return { success: true, user };
                } else {
                    // Si no se encuentra el usuario, login fallido
                    return { success: false, message: "Username or password is incorrect" };
                }
            })
            .catch((error) => {
                console.error("Error durante el login:", error);
                return { success: false, message: "authentication fail" };
            });
    }

}
