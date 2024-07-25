import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobListingComponent } from './pages/job-listing/job-listing.component';

const routes: Routes = [
  { path: '', component: JobListingComponent }
];

@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class JobListingsModule { }
