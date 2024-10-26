export class Pendingpay {
   constructor({ id, dni, first_name, last_name, appointment_date, duration_minutes, reason, dentist, payment_status, amount }) {
      this.id = id;
      this.dni = dni;
      this.name = `${first_name} ${last_name}`;
      this.appointment_date = appointment_date;
      this.time = new Date(appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.duration_minutes = duration_minutes;
      this.reason = reason;
      this.dentist = `${dentist.first_name} ${dentist.last_name}`;
      this.payment_status = payment_status;
      this.amount = amount;

   }
}
