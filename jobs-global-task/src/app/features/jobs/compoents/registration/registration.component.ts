import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      mobileOrEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister(): void {
    if (this.registrationForm.valid) {
      // Handle registration logic (mock or real API)
      console.log('Registration data:', this.registrationForm.value);
    }
  }
}
