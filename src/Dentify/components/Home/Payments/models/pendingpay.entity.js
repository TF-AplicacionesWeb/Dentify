export class Pendingpay{
   constructor({ appointment_id, dni, name, appointment_date, time, duration_minutes, reason, dentist, payment_status }) {
      this.appointment_id = appointment_id;
      this.dni = dni;
      this.name = `${name.first_name} ${name.last_name}`;
      this.appointment_date = appointment_date;
      this.time = new Date(appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.duration_minutes = duration_minutes;
      this.reason = reason;
      this.dentist = `${dentist.first_name} ${dentist.last_name}`;
      this.payment_status = payment_status;
   }
}

