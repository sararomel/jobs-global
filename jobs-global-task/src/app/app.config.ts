import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),
    provideStore(),
    importProvidersFrom(HttpClientModule), // Import BrowserAnimationsModule here
    importProvidersFrom(ToastrModule.forRoot()), // Add ToastrModule
    importProvidersFrom(NoopAnimationsModule), // Use NoopAnimationsModule instead of BrowserAnimationsModule

  ]
};
