import { Component, Inject, OnInit } from '@angular/core';
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  display: boolean = false;
  job: any;

  constructor(
    @Inject('job') job: any
  ) {
    this.job = job;
  }

  ngOnInit(): void {
    this.display = true;
  }

  openApplicationForm() {
    // You can implement this to open a custom application form modal
  }

  close() {
    this.display = false;
  }
}
