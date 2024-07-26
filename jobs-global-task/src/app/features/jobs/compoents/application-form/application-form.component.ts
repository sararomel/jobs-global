import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent {
  @Input() job: any;
  @Output() close = new EventEmitter<void>();
  applicationForm: FormGroup;
  cvError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cv: [null, Validators.required]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.size > 3 * 1024 * 1024) {
      this.cvError = 'File size should not exceed 3MB';
      this.applicationForm?.get('cv')?.setErrors({ incorrect: true });
    } else {
      this.cvError = null;
      this.applicationForm?.get('cv')?.setValue(file);
    }
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      console.log('Application submitted:', this.applicationForm.value);
      // Handle form submission logic
      this.close.emit();
    }
  }
}
