import { Injectable } from "@angular/core";
import { UserDto } from "src/app/models/dtos/UserDto";
import { AmcUsersHttpService } from "../http/amc-users/amc-users-http.service";
import { catchError, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: UserDto;
    errorMsg: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private usersHttpService: AmcUsersHttpService) { }

    login(userDto: UserDto) {
        this.usersHttpService.login(userDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((user: UserDto) => {
            this.errorMsg.next(null);
            this.user = user;
            console.warn(user);
            // TODO REDIRECT
        });
    }


    signup(userDto: UserDto) {
        this.usersHttpService.signup(userDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((user: UserDto) => {
            this.errorMsg.next(null);
            this.user = user;
            console.warn(user);
            // TODO REDIRECT
        });
    }

}