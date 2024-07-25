import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jobsStore } from '../../store/jobs.store';
import { DialogService } from 'primeng/dynamicdialog/dialogservice';
import { JobDetailsComponent } from '../../compoents/job-details/job-details.component';
import { ApplicationFormComponent } from '../../compoents/application-form/application-form.component';

@Component({
  selector: 'app-job-listing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss'],
  providers: [DialogService,
  ]
})
export class JobListingComponent implements OnInit {
  readonly jobsStore = inject(jobsStore)

  jobs: any[] = [];
  filteredJobs: any[] = [];
  titleFilter = '';
  locationFilter = '';
  page = 1;

  constructor(private dialogService: DialogService) { }

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
    const dialogRef = this.dialogService.open(JobDetailsComponent, {
      data: { job },
      header: 'Job Details',
      width: '70%'
    });

    dialogRef.onClose.subscribe(result => {
      if (result?.action === 'apply') {
        this.openApplicationForm(result.job);
      }
    });
  }

  openApplicationForm(job: any): void {
    this.dialogService.open(ApplicationFormComponent, {
      data: { job },
      header: `Apply for ${job.title}`,
      width: '70%'
    });
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
