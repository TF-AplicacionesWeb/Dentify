export class User {
    constructor({id=0, username="", first_name="default", last_name="default",
                    email="default", phone="default", register_date ="default", company ="default", password = "default"}) {
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

