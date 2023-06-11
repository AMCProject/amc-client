import { Injectable } from "@angular/core";
import { UserDto } from "src/app/models/dtos/UserDto";
import { AmcUsersHttpService } from "../http/amc-users/amc-users-http.service";
import { catchError, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: BehaviorSubject<UserDto> = new BehaviorSubject(null);
    errorMsg: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(
        private usersHttpService: AmcUsersHttpService,
        private router: Router
        ) { 
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                this.user.next(JSON.parse(savedUser));
            }
        }

    login(userDto: UserDto) {
        this.usersHttpService.login(userDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((user: UserDto) => {
            this.errorMsg.next(null);
            localStorage.setItem("user", JSON.stringify(user))
            this.user.next(user);
            this.router.navigate(['/calendar']);
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
            localStorage.setItem("user", JSON.stringify(user))
            this.user.next(user);
            this.router.navigate(['/calendar']);
        });
    }

    updateUser(userDto: UserDto) {
        this.usersHttpService.updateUser(userDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((user: UserDto) => {
            this.errorMsg.next(null);
            localStorage.setItem("user", JSON.stringify(user))
            this.user.next(user);
            // TODO REFRESH
        });
    }

    logout() {
        localStorage.removeItem("user")
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

}