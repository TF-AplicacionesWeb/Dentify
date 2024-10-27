export class AppointmentEntity {
    constructor({ id, dentist_dni, user_id, appointment_date, reason, completed, reminder_sent, duration_minutes, payment_id, payment_status }) {
        this.id = id;
        this.dentist_dni = dentist_dni;
        this.user_id = user_id;
        this.appointment_date = appointment_date;
        this.time = new Date(appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.reason = reason;
        this.completed = completed;
        this.reminder_sent = reminder_sent;
        this.duration_minutes = duration_minutes;
        this.payment_id = payment_id;
        this.payment_status = payment_status;
    }
}
