import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isAuthenitcated: boolean = false;
  private userName: string;

  constructor(private authService: AuthService) { 
    this.authService.initAuth();
    this.isAuthenitcated = this.authService.isAuthenticated();
    if(this.isAuthenitcated)
      this.userName = this.authService.getUserName();

  }

  ngOnInit() {
  }

  login(){
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
