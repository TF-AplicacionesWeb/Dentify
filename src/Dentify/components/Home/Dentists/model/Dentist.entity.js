export class Dentist {
    constructor({id, first_name, last_name, specialty, experience, phone, email,
                    total_appointments, user_id
                }) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.specialty = specialty;
        this.experience = experience;
        this.phone = phone;
        this.email = email;
        this.total_appointments = total_appointments;
        this.user_id = user_id;
    }
}