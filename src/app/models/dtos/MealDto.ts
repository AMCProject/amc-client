export class MealDto {
    public id: string;
    public user_id: string;
    public name: string;
    public description: string
    public image: string;
    public type: string;
    public ingredients: Array<string>;
    public kcal: number;
    public seasons: Array<string>;

    constructor() {
        this.id = "";
        this.user_id = "";
        this.name = "";
        this.description = "";
        this.image = "";
        this.type = "";
        this.ingredients = [];
        this.kcal = 0;
        this.seasons = [];
    }
}