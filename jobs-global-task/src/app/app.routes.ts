import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'job-listings', pathMatch: 'full' },
  { path: 'job-listings', loadChildren: () => import('./features/jobs/job-listings.module').then(m => m.JobListingsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
