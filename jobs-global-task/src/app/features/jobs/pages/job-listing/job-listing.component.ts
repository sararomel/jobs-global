import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jobsStore } from '../../store/jobs.store';
import { JobDetailsComponent } from '../../compoents/job-details/job-details.component';
import { ApplicationFormComponent } from '../../compoents/application-form/application-form.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-listing',
  standalone: true,
  imports: [CommonModule, FormsModule,ApplicationFormComponent,RouterModule],
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss'],

})
export class JobListingComponent implements OnInit {
  readonly jobsStore = inject(jobsStore)

  jobs: any[] = [];
  filteredJobs: any[] = [];
  titleFilter = '';
  locationFilter = '';
  page = 1;
  selectedJob: any = null;
  showJobDetails = false;
  showApplicationForm = false;
  constructor() { }

  ngOnInit(): void {
    this.loadJobs();
  }

  async loadJobs(): Promise<void> {
    await this.jobsStore.loadjobs();
    const allJobs = this.jobsStore.jobs()?.data;
    this.filteredJobs = allJobs;
    this.filterJobs();
  }

  loadMore(): void {
    this.page++;
    this.loadJobs();
  }


  openDetails(job: any): void {
    this.selectedJob = job;
    this.showJobDetails = true;
  }

  closeDetails(): void {
    this.showJobDetails = false;
  }

  openApplicationForm(): void {
    this.showApplicationForm = true;
  }

  closeApplicationForm(): void {
    this.showApplicationForm = false;
  }

  filterJobs(): void {
    const titleFilterLower = this.titleFilter.toLowerCase();
    const locationFilterLower = this.locationFilter.toLowerCase();
    if (titleFilterLower || locationFilterLower) {
      const allJobs = this.jobsStore.jobs()?.data || [];
      this.filteredJobs = allJobs.filter((job: any) => {
        if (job?.title?.toLocaleLowerCase().includes(titleFilterLower) ||
          job?.location?.toLocaleLowerCase().includes(locationFilterLower)) {
          return job
        }
      }
      );
    }
  }
}
