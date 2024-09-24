import axios from "axios";
import {Profile} from "../model/Profile.entity.js";

export class ProfileApiService {


    static getData() {

        return axios.get("http://localhost:3000/users")
            .then((response) => {
                return response.data.map(profiledata => new Profile(profiledata));
            });
    }
}