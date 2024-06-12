import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AuthResponse} from "../auth-response.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public errorMessage: string = '';

  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required, Validators.maxLength(64), Validators.minLength(5)]],
      password: ['', [Validators.minLength(8), Validators.maxLength(128)]],
      repeated_password: ['',  [Validators.minLength(8), Validators.maxLength(128)]]
    });
  }

  public onSubmit(): void {
    if(this.registerForm.value.password !== this.registerForm.value.repeated_password)
    {
      this.errorMessage = "Passwords must be identical!";
      return;
    }

    this.errorMessage = "";
    this.authService
      .register(this.registerForm.value)
      .subscribe((authResponse: AuthResponse) => {
        console.log('AuthResponse: ', authResponse);
        this.router.navigate(['']);
      });
  }


}
