import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-root',
  template: '',
  providers: [AuthService],
})

export class CallbackComponent {

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.callback(window.location.href.split('?')[1]);
  }
}
