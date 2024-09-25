import axios from "axios";
import {Profile} from "../model/Profile.entity.js";

export class ProfileApiService {


    static getData() {

        return axios.get("http://localhost:3000/users")
            .then((response) => {
                return response.data.map(profiledata => new Profile(profiledata));
            });
    }

    static updatePassword(userId, newPassword) {
        return axios.get(`http://localhost:3000/users?user_id=${userId}`)
            .then(response => {
                console.log("Response from GET user:", response.data);

                const user = response.data[0];

                if (!user) {
                    throw new Error('User not found');
                }

                user.password = newPassword;

                console.log("User after password update:", user);

                return axios.put(`http://localhost:3000/users/${user.id}`, user);
            })
            .then(response => {
                console.log("Response from PUT request:", response.data);
                return response;
            })
            .catch(error => {
                console.error("Error updating password:", error);
                throw error;
            });
    }

}