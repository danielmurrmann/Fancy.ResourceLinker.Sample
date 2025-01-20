import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideHateoas, withAntiForgery, withCustomHeaders, withLoginRedirect } from '@angular-architects/ngrx-hateoas';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideHateoas(withLoginRedirect(), withAntiForgery(), withCustomHeaders({headers:{"X-Requested-With": 'XmlHttpRequest'}}))
  ]
};
