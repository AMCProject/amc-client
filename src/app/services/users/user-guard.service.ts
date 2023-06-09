import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
    constructor(public authService: AuthService, public router: Router) {}
  
    canActivate(): boolean {
        if (!this.authService.user.value) {
            this.router.navigate(['auth']);
            return false;
        } else {
            return true;
        }
    }
}