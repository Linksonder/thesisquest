import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService) {
    
  }
}
