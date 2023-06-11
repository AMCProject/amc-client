export class CalendarDto {
    public user_id: string;
    public meal_id: string;
    public name: string;
    public date: string

    constructor() {
        this.user_id = "";
        this.meal_id = "";
        this.name = "";
        this.date = "";
    }

}