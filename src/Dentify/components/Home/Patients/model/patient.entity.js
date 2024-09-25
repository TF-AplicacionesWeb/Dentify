
export class Patient {
    constructor({
                    dni,
                    clinical_record_id,
                    first_name,
                    last_name,
                    email,
                    age,
                    medical_history,
                    birth_date,
                    appointment_id,
                    user_id
                }) {
        this.dni = dni;
        this.clinical_record_id = clinical_record_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.age = age;
        this.medical_history = medical_history;
        this.birth_date = birth_date;
        this.appointment_id = appointment_id;
        this.user_id = user_id;


    }

}