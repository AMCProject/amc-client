export class UserDto {
    public id: string;
    public name: string;
    public mail: string;
    public password: string

    constructor() {
        this.id = "";
        this.name = "";
        this.mail = "";
        this.password = "";
    }

}