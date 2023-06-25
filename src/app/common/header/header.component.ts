import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDto } from 'src/app/models/dtos/UserDto';
import { AuthService } from 'src/app/services/users/user.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }

}
