export class Dentist {
    constructor({id, dni, first_name, last_name, specialty, experience, phone, email,
                    total_appointments
                }) {
        this.id = id;
        this.dni = dni;
        this.first_name = first_name;
        this.last_name = last_name;
        this.specialty = specialty;
        this.experience = experience;
        this.phone = phone;
        this.email = email;
        this.total_appointments = total_appointments;
    }
}