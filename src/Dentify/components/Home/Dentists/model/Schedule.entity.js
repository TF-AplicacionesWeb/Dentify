export class Schedule {
    constructor({id, dentist_id, weekday, start_time, end_time, date, user_id}) {
        this.id = id;
        this.dentist_id = dentist_id;
        this.weekday = weekday;
        this.start_time = start_time;
        this.end_time = end_time;
        this.date = date;
        this.user_id = user_id;
    }
}