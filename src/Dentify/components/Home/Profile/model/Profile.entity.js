export class Profile {
    constructor({id, username, first_name, last_name, email, phone, register_date, company, password}) {
        this.id = id;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.register_date = register_date;
        this.company = company;
        this.password = password;
    }
}
