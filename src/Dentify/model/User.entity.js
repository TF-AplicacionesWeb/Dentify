export class User {
    constructor({id, username, password, name, lastname, email, phone, register_date, trial, name_clinic}) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.register_date = register_date;
        this.trial = trial;
        this.name_clinic = name_clinic;
    }
}