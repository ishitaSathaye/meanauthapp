import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username: String;
password: String;

  constructor(private authService: AuthService,
  private router: Router,
  private flashmessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data =>{
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashmessage.show('Login successful', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['dashboard']);
      }else{
        this.flashmessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['login']);
      }
    });     
  }

}
