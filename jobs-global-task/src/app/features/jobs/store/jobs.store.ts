import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { JobService } from '../services/job.service';
import { jobsGetResponse } from '../models/jobs.model';

type jobsState = {
  jobs: any | null;
  jobsLoaded:boolean;
  loading: boolean;
  error: any;
  pageNumber: number;
  pageSize: number;
  count: number;

};

const initialState: jobsState = {
  jobs: null,
  jobsLoaded:false,
  loading: false,
  error: '',
  pageNumber: 1,
  pageSize: 10,
  count: 0,

};

export const jobsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // withComputed(({ query, pageNumber, pageSize }) => ({
  //   // columns: computed(() => query()['cols']?.split(',') ?? []),
  //   // fullQuery: computed(() => {
  //   //   const columns = query()['cols']?.split(',') ?? [];
  //   //   if (!columns.includes('rowversion')) {
  //   //     columns.push('rowversion');
  //   //   }

  //   //   return {
  //   //     ...query(),
  //   //     cols: columns.join(','),
  //   //     count: true,
  //   //     page_no: pageNumber(),
  //   //     page_size: pageSize(),
  //   //   };
  //   // }),
  // })),
  withMethods(
    (
      store,
      jobsService = inject(JobService)
    ) => ({
     
      async loadjobs() {
        try {
          const response = await jobsService.getJobs();          
          patchState(store, { jobs: response });
          patchState(store, { jobsLoaded: true });
        } catch (error) {
          patchState(store, { error });
          console.error(error);
        }
      },
    }),
  ),
);
