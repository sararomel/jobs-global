import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/jobs/compoents/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'job-listings', pathMatch: 'full' },
  { path: 'job-listings', loadChildren: () => import('./features/jobs/job-listings.module').then(m => m.JobListingsModule) }
  , { path: 'login', component: LoginComponent } // Add route for login

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
