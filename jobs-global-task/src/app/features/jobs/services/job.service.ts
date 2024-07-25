import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { lastValueFrom, Observable, take } from 'rxjs';
import { jobsGetResponse } from '../models/jobs.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'https://api-next.jobsglobal.com:54902/api/v1/jobs/all?pagination_type=paginate&per_page=11';

  constructor(private http: HttpClient) {}

  getJobs(page: number = 1):Promise<HttpResponse<any>> {
    const req = this.http.get<any>(`${this.apiUrl}&page=${page}`)
    .pipe(take(1));
  return lastValueFrom(req);
  }
}
