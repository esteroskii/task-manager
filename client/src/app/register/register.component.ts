import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { name, email, password } = this.form;

    var signupinfo = {
      "name": name,
      "email": email,
      "password": password
    }

    this.authService.register(signupinfo).subscribe(
      data => {
        console.log("entro");
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  redirectPage(): void {
    this.router.navigate(['/login']);
  }

}
