import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable, catchError, map, throwError } from "rxjs";
import { UserDto } from "src/app/models/dtos/UserDto";

@Injectable({
    providedIn: 'root'
})
export class AmcUsersHttpService {

    private readonly URL = "http://localhost";
    private readonly PORT = ":3100";

    private readonly loginPath = "/login";
    private readonly signUpPath = "/user";
    private readonly userIdPath = "/user/:id"

    constructor(
        private httpClient: HttpClient
    ) {

    }

    login(userDto: UserDto): Observable<UserDto> {
        return this.httpClient.post(this.URL + this.PORT + this.loginPath, userDto).pipe(
            map(res => res as UserDto),
            catchError(this.processError)
            );
    }

    signup(userDto: UserDto): Observable<UserDto> {
        return this.httpClient.post(this.URL + this.PORT + this.signUpPath, userDto).pipe(
            map(res => res as UserDto),
            catchError(this.processError)
            );
    }
    
    getUser(userDto: UserDto): Observable<UserDto> {
        return this.httpClient.get(this.URL + this.PORT + this.userIdPath).pipe(
            map(res => res as UserDto),
            catchError(this.processError)
            );
    }

    updateUser(userDto: UserDto): Observable<UserDto> {
        return this.httpClient.put(this.URL + this.PORT + this.userIdPath, userDto).pipe(
            map(res => res as UserDto),
            catchError(this.processError)
            );
    }

    deleteUser(userDto: UserDto): Observable<UserDto> {
        return this.httpClient.delete(this.URL + this.PORT + this.userIdPath).pipe(
            map(res => res as UserDto),
            catchError(this.processError)
            );
    }

    private processError(error: any) {
        console.error(error);
        return throwError(() => new Error(error.error.error.message));
    }

}