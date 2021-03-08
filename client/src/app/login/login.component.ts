import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AuthService } from '../_services/auth.service';
//Imports de prueba
import { ProjectService } from '../_services/project.service';
import { ProjectStatusesService } from '../_services/project-statuses.service';
import { TaskService } from '../_services/task.service';


import { TokenStorageService } from '../_services/token-storage.service';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private route:ActivatedRoute,private router:Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = false;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    var authinfo = {
      "email":email,
      "password":password
    }

  this.authService.login(authinfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        console.log(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.tokenStorage.getUser().roles;
        console.log("llego");
        this.redirectPage();
      },
      
      err => {
        console.log(this.form);
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        console.log(err.error.message);
        this.isLoginFailed = true;
      }
      
    );
    
  }

  redirectPage(): void {
   this.router.navigate(['/project-board']);
  }
}
