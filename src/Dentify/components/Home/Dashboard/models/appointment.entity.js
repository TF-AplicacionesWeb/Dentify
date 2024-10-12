export class Appointment {
    constructor(id, dentistDni, userId, appointmentDate, reason, completed = false, reminderSent = false, durationMinutes = 30, paymentId = null, paymentStatus = false) {
        this.id = id;
        this.dentistDni = dentistDni;
        this.userId = userId;
        this.appointmentDate = appointmentDate;
        this.reason = reason;
        this.completed = completed;
        this.reminderSent = reminderSent;
        this.durationMinutes = durationMinutes;
        this.paymentId = paymentId;
        this.paymentStatus = paymentStatus;
    }
}