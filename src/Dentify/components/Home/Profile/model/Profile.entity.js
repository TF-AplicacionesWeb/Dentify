export class Profile {
    constructor({user_id, username, first_name, last_name, email, phone, registration_date, company, password}) {
        this.id = user_id;
        this.username = username;
        this.name = first_name;
        this.lastname = last_name;
        this.email = email;
        this.phone = phone;
        this.register_date = registration_date;
        this.company = company;
        this.password = password;
    }
}
