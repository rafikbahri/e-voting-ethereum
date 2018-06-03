import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  error = false;
  errorMessage = '';
  loginAttempt: boolean = false;
  constructor(private fb: FormBuilder, private authService:AuthService,private router:Router) { }

  login() {
    this.loginAttempt = true;
    if (this.myForm.valid) {
      this.authService.login(this.myForm.value.email,this.myForm.value.password).then(res=>{
         this.router.navigate(['/home']);
      }).catch(e=>{
        this.errorMessage = e.message;
      })
    }
  }

  ngOnInit(): any {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.myForm = this.fb.group({
      "email": ["", Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      "password": ["", Validators.compose([Validators.required])]
    });
  }
}
