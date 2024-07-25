import { Component, Inject } from '@angular/core';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule,
    ReactiveFormsModule, CommonModule,
    DynamicDialogModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
  providers: [DynamicDialogRef]

})
export class JobDetailsComponent {
  display: boolean = true;
  job: any;

  constructor(
    private dialogService: DialogService,
    @Inject('job') job: any
  ) {
    this.job = job;
  }

  openApplicationForm() {
    this.dialogService.open(ApplicationFormComponent, {
      header: `Apply for ${this.job.title}`,
      width: '70%',
      data: { job: this.job }
    });
  }

  close() {
    this.display = false;
  }
}
