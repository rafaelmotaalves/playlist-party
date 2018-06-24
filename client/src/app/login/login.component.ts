import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  providers: [ AuthService],
  styleUrls: ['login.component.css'],
})

export class LoginComponent {

  constructor(
    private auth: AuthService,
  ) { }

}
