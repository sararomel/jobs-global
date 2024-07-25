import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule} from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule, CommonModule, DynamicDialogModule, ReactiveFormsModule],
  providers: [DynamicDialogRef]
})
export class ApplicationFormComponent {
  display: boolean = true;
  applicationForm: FormGroup;
  cvError: string | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: DynamicDialogRef,
    @Inject('job') public job: any
  ) {
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Add other form controls similarly
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
      // Handle form submission
      console.log('Application submitted:', this.applicationForm.value);
      this.dialogRef.close({ action: 'submit', data: this.applicationForm.value });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
