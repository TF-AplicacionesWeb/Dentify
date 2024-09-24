export class User {
    constructor({user_id=0, username="", first_name="default", last_name="default",
                    email="default", phone="default", registration_date ="default", company ="default", password = "default"}) {
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

