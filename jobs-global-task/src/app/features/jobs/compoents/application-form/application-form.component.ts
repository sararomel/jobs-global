import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
  ],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent {
  @Input() job: any;
  @Output() close = new EventEmitter<any>();
  applicationForm: FormGroup;
  cvError: string | null = null;
  applyButtonState = 'Apply';

  constructor(private fb: FormBuilder, private toastr: ToastrService, private mockApiService: JobService) {
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

  // onSubmit(): void {
  //   if (this.applicationForm.valid) {
  //     console.log('Application submitted:', this.applicationForm.value);
  //     // Handle form submission logic
  //     this.close.emit();
  //   }
  // }
  onSubmit(): void {
    if (this.applicationForm.valid) {
      console.log(this.applicationForm, 'response');

      this.mockApiService.submitApplication(this.applicationForm.value).subscribe(response => {
        console.log(response, 'response');

        if (response.success) {
          this.toastr.success('Application submitted successfully!');
          this.applyButtonState = 'Applied';
          this.close.emit();
        }
      });
    }
  }

}
